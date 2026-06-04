#!/usr/bin/env python3
"""
Fetch all SonarQube issues for a project, categorized by type.
Outputs JSON to stdout. Exit code 0 on success, 1 on error.

Usage:
  python3 fetch_issues.py --host URL --token TOKEN --project-key KEY [--category all]
"""

import argparse
import base64
import json
import sys
from urllib.request import urlopen, Request
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode


class ForbiddenError(Exception):
    """Raised when a specific endpoint returns 403 (may be token-type limitation)."""
    pass


def make_request(host, token, path, params=None, allow_forbidden=False):
    """Make authenticated request to SonarQube API.

    Args:
        allow_forbidden: If True, raise ForbiddenError on 403 instead of exiting.
                         Use for endpoints that may be restricted by token type.
    """
    url = f"{host.rstrip('/')}{path}"
    if params:
        url = f"{url}?{urlencode(params)}"

    credentials = base64.b64encode(f"{token}:".encode()).decode()
    req = Request(url, headers={"Authorization": f"Basic {credentials}"})

    try:
        with urlopen(req, timeout=30) as response:
            return json.loads(response.read().decode())
    except HTTPError as e:
        if e.code == 401:
            print(json.dumps({"error": "UNAUTHORIZED", "message": "Invalid or expired token. Generate a new one at: SonarQube → My Account → Security → Tokens"}))
            sys.exit(1)
        elif e.code == 403:
            if allow_forbidden:
                raise ForbiddenError(f"403 Forbidden on {path}")
            print(json.dumps({"error": "FORBIDDEN", "message": f"Token does not have permission to access {path}. For hotspots, a User Token with Browse permission is required (Global Analysis Tokens are restricted)."}))
            sys.exit(1)
        elif e.code == 404:
            print(json.dumps({"error": "NOT_FOUND", "message": "Resource not found. Check project key is correct."}))
            sys.exit(1)
        else:
            body = e.read().decode() if hasattr(e, "read") else ""
            print(json.dumps({"error": f"HTTP_{e.code}", "message": str(e), "body": body}))
            sys.exit(1)
    except URLError as e:
        print(json.dumps({"error": "NETWORK_ERROR", "message": f"Cannot reach SonarQube: {e.reason}"}))
        sys.exit(1)


def fetch_issues_paginated(host, token, project_key, issue_types):
    """Fetch all issues of given types with automatic pagination."""
    issues = []
    page = 1
    page_size = 500

    while True:
        data = make_request(host, token, "/api/issues/search", {
            "componentKeys": project_key,
            "types": ",".join(issue_types),
            "resolved": "false",
            "ps": page_size,
            "p": page,
        })

        batch = data.get("issues", [])
        issues.extend(batch)
        total = data.get("total", 0)

        if len(issues) >= total or not batch:
            return issues, total

        # SonarQube caps at 10000 results
        if page * page_size >= 10000:
            return issues, total

        page += 1

    return issues, len(issues)


def fetch_hotspots_paginated(host, token, project_key):
    """Fetch all TO_REVIEW security hotspots with pagination.

    Note: /api/hotspots/search requires Browse permission. Global Analysis Tokens
    are restricted from this endpoint — returns empty list with a warning if 403.
    """
    hotspots = []
    page = 1
    page_size = 500

    while True:
        try:
            data = make_request(host, token, "/api/hotspots/search", {
                "projectKey": project_key,
                "status": "TO_REVIEW",
                "ps": page_size,
                "p": page,
            }, allow_forbidden=True)
        except ForbiddenError:
            print(
                "Warning: /api/hotspots/search returned 403. "
                "Global Analysis Tokens cannot read hotspots via API. "
                "Skipping hotspots — use a User Token with Browse permission to include them.",
                file=sys.stderr,
            )
            return [], 0

        batch = data.get("hotspots", [])
        hotspots.extend(batch)
        paging = data.get("paging", {})
        total = paging.get("total", 0)

        if len(hotspots) >= total or not batch:
            return hotspots, total

        page += 1

    return hotspots, len(hotspots)


def fetch_metrics(host, token, project_key):
    """Fetch coverage and duplication metrics."""
    data = make_request(host, token, "/api/measures/component", {
        "component": project_key,
        "metricKeys": "coverage,duplicated_lines_density,duplicated_blocks,uncovered_lines",
    })

    measures = {}
    for m in data.get("component", {}).get("measures", []):
        measures[m["metric"]] = m.get("value", "0")

    return measures


def format_issue(issue):
    """Format an issue to a compact representation for Claude."""
    # Strip project prefix from component path
    component = issue.get("component", "")
    if ":" in component:
        component = component.split(":", 1)[1]

    return {
        "key": issue.get("key", ""),
        "file": component,
        "line": issue.get("line"),
        "message": issue.get("message", ""),
        "severity": issue.get("severity", ""),
        "rule": issue.get("rule", ""),
        "effort": issue.get("effort", ""),
        "tags": issue.get("tags", []),
    }


def format_hotspot(hotspot):
    """Format a hotspot to a compact representation for Claude."""
    component = hotspot.get("component", {})
    path = component.get("path", "") if isinstance(component, dict) else ""

    return {
        "key": hotspot.get("key", ""),
        "file": path,
        "line": hotspot.get("line"),
        "message": hotspot.get("message", ""),
        "vulnerability_probability": hotspot.get("vulnerabilityProbability", ""),
        "rule": hotspot.get("ruleKey", ""),
        "author": hotspot.get("author", ""),
    }


def main():
    parser = argparse.ArgumentParser(description="Fetch SonarQube issues by category")
    parser.add_argument("--host", required=True, help="SonarQube base URL (e.g. https://sonar.company.com)")
    parser.add_argument("--token", required=True, help="SonarQube user token")
    parser.add_argument("--project-key", required=True, help="SonarQube project key")
    parser.add_argument(
        "--category",
        default="all",
        choices=["all", "security", "reliability", "maintainability", "hotspots", "coverage"],
        help="Which category to fetch (default: all)",
    )
    args = parser.parse_args()

    result = {}

    # --- Security Vulnerabilities ---
    if args.category in ("all", "security"):
        issues, total = fetch_issues_paginated(
            args.host, args.token, args.project_key, ["VULNERABILITY"]
        )
        result["security"] = {
            "count": total,
            "issues": [format_issue(i) for i in issues],
        }

    # --- Reliability Bugs ---
    if args.category in ("all", "reliability"):
        issues, total = fetch_issues_paginated(
            args.host, args.token, args.project_key, ["BUG"]
        )
        result["reliability"] = {
            "count": total,
            "issues": [format_issue(i) for i in issues],
        }

    # --- Maintainability Code Smells ---
    if args.category in ("all", "maintainability"):
        issues, total = fetch_issues_paginated(
            args.host, args.token, args.project_key, ["CODE_SMELL"]
        )
        result["maintainability"] = {
            "count": total,
            "issues": [format_issue(i) for i in issues],
        }

    # --- Security Hotspots ---
    if args.category in ("all", "hotspots"):
        hotspots, total = fetch_hotspots_paginated(
            args.host, args.token, args.project_key
        )
        result["hotspots"] = {
            "count": total,
            "issues": [format_hotspot(h) for h in hotspots],
        }

    # --- Coverage & Duplications ---
    if args.category in ("all", "coverage"):
        measures = fetch_metrics(args.host, args.token, args.project_key)
        result["coverage"] = {
            "coverage_pct": round(float(measures.get("coverage", 0)), 1),
            "duplications_pct": round(float(measures.get("duplicated_lines_density", 0)), 1),
            "duplicated_blocks": int(float(measures.get("duplicated_blocks", 0))),
            "uncovered_lines": int(float(measures.get("uncovered_lines", 0))),
        }

    # --- Summary ---
    result["summary"] = {
        "security": result.get("security", {}).get("count", 0),
        "reliability": result.get("reliability", {}).get("count", 0),
        "maintainability": result.get("maintainability", {}).get("count", 0),
        "hotspots": result.get("hotspots", {}).get("count", 0),
        "coverage_pct": result.get("coverage", {}).get("coverage_pct", 0),
        "duplications_pct": result.get("coverage", {}).get("duplications_pct", 0),
        "total_issues": (
            result.get("security", {}).get("count", 0)
            + result.get("reliability", {}).get("count", 0)
            + result.get("maintainability", {}).get("count", 0)
            + result.get("hotspots", {}).get("count", 0)
        ),
    }

    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
