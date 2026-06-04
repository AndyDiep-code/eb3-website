#!/usr/bin/env python3
"""Convert Markdown to PDF with watermark, header, and footer support.

Converts markdown files to A4 portrait PDFs with optional watermark/logo,
header (logo + title), and footer (page numbers).

Features:
- Proper text wrapping for long URLs and code
- Table rendering support
- Mermaid diagram pre-rendering (requires mmdc CLI)
- Watermark on all pages
- Header with logo and title
- Footer with page numbers

Usage:
    python md_to_pdf.py input.md [output.pdf] [--watermark logo.png]
    python md_to_pdf.py input.md --header-logo logo.png --watermark watermark.png

Requirements:
    pip install markdown weasyprint pypdf Pillow reportlab

Optional (for mermaid diagrams):
    npm install -g @mermaid-js/mermaid-cli

Dependencies:
    - markdown: MD to HTML conversion
    - weasyprint: HTML to PDF (requires system deps: cairo, pango, gdk-pixbuf)
    - pypdf: PDF watermark merging
    - Pillow: Image processing
    - reportlab: Create watermark/header/footer PDF from image
"""

import argparse
import io
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

try:
    import markdown
    from markdown.extensions.tables import TableExtension
    from weasyprint import HTML, CSS
    from pypdf import PdfReader, PdfWriter
    from PIL import Image
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.utils import ImageReader
    from reportlab.lib.colors import Color
except ImportError as e:
    print(f"Missing dependency: {e}")
    print("\nInstall required packages:")
    print("  pip install markdown weasyprint pypdf Pillow reportlab pygments")
    print("\nWeasyprint also requires system dependencies:")
    print("  macOS: brew install cairo pango gdk-pixbuf libffi")
    print("  Ubuntu: apt-get install libcairo2 libpango-1.0-0 libgdk-pixbuf2.0-0")
    sys.exit(1)

# Check for Pygments (optional but recommended for syntax highlighting)
PYGMENTS_AVAILABLE = False
try:
    import pygments
    PYGMENTS_AVAILABLE = True
except ImportError:
    pass

# Check for pymdownx (required for proper code blocks in list items)
PYMDOWNX_AVAILABLE = False
try:
    import pymdownx
    PYMDOWNX_AVAILABLE = True
except ImportError:
    pass


def install_pymdownx() -> bool:
    """Attempt to install pymdown-extensions via pip.

    Returns:
        True if installation successful, False otherwise
    """
    print("pymdown-extensions not found. Attempting to install...")

    try:
        result = subprocess.run(
            [sys.executable, '-m', 'pip', 'install', 'pymdown-extensions', '--user', '-q'],
            capture_output=True,
            timeout=60
        )
        if result.returncode == 0:
            print("pymdown-extensions installed successfully!")
            return True
        else:
            # Try without --user flag
            result = subprocess.run(
                [sys.executable, '-m', 'pip', 'install', 'pymdown-extensions', '-q'],
                capture_output=True,
                timeout=60
            )
            if result.returncode == 0:
                print("pymdown-extensions installed successfully!")
                return True
            return False
    except Exception:
        return False


def ensure_pymdownx() -> bool:
    """Ensure pymdown-extensions is available, installing if necessary.

    Returns:
        True if pymdownx is available, False otherwise
    """
    global PYMDOWNX_AVAILABLE

    if PYMDOWNX_AVAILABLE:
        return True

    # Try to install
    if install_pymdownx():
        try:
            import pymdownx
            PYMDOWNX_AVAILABLE = True
            return True
        except ImportError:
            pass

    return False


def install_pygments() -> bool:
    """Attempt to install Pygments via pip.

    Returns:
        True if installation successful, False otherwise
    """
    print("Pygments not found. Attempting to install...")

    try:
        result = subprocess.run(
            [sys.executable, '-m', 'pip', 'install', 'pygments', '--user', '-q'],
            capture_output=True,
            timeout=60
        )
        if result.returncode == 0:
            print("Pygments installed successfully!")
            return True
        else:
            # Try without --user flag
            result = subprocess.run(
                [sys.executable, '-m', 'pip', 'install', 'pygments', '-q'],
                capture_output=True,
                timeout=60
            )
            if result.returncode == 0:
                print("Pygments installed successfully!")
                return True
            stderr = result.stderr.decode('utf-8', errors='ignore')
            print(f"Installation failed: {stderr}")
            return False
    except subprocess.TimeoutExpired:
        print("Installation timed out.")
        return False
    except Exception as e:
        print(f"Installation error: {e}")
        return False


def ensure_pygments() -> bool:
    """Ensure Pygments is available, installing if necessary.

    Returns:
        True if Pygments is available, False otherwise
    """
    global PYGMENTS_AVAILABLE

    if PYGMENTS_AVAILABLE:
        return True

    # Try to install
    if install_pygments():
        # Verify installation worked by importing
        try:
            import pygments
            PYGMENTS_AVAILABLE = True
            return True
        except ImportError:
            pass

    return False

# A4 dimensions in points (72 points = 1 inch)
A4_WIDTH_PT = 595.28
A4_HEIGHT_PT = 841.89

# Margins in points (2cm = 56.69pt, 2.5cm = 70.87pt)
MARGIN_LEFT = 56.69
MARGIN_RIGHT = 56.69
MARGIN_TOP = 70.87
MARGIN_BOTTOM = 70.87

# Header/Footer settings
HEADER_HEIGHT = 40
FOOTER_HEIGHT = 30
HEADER_LOGO_HEIGHT = 25
ENOUVO_RED = Color(0.906, 0.298, 0.235, 1)  # #e74c3c

# Default CSS for A4 PDF with space for header/footer
# Fixed: Added word-wrap and overflow handling for long content
DEFAULT_CSS = """
@page {
    size: A4 portrait;
    margin: 3.5cm 2cm 2.5cm 2cm;  /* top right bottom left - extra top for header */
}

* {
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #333;
    max-width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

h1 {
    font-size: 24pt;
    color: #1a1a1a;
    border-bottom: 2px solid #e74c3c;
    padding-bottom: 0.3em;
    margin-top: 0.5em;
    word-wrap: break-word;
    page-break-after: avoid;
}

h2 {
    font-size: 18pt;
    color: #2c3e50;
    margin-top: 1.5em;
    page-break-after: avoid;
}

h3 {
    font-size: 14pt;
    color: #34495e;
    margin-top: 1.2em;
    page-break-after: avoid;
}

h4, h5, h6 {
    font-size: 12pt;
    color: #34495e;
    page-break-after: avoid;
}

p {
    margin: 0.8em 0;
    text-align: justify;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

/* Inline code - allow wrapping */
code {
    font-family: "SF Mono", "Monaco", "Inconsolata", "Fira Mono", "Courier New", monospace;
    font-size: 9pt;
    background-color: rgba(245, 245, 245, 0.7);  /* Semi-transparent for watermark */
    padding: 0.2em 0.4em;
    border-radius: 3px;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

/* Code blocks - wrap long lines */
pre {
    background-color: rgba(248, 248, 248, 0.5);  /* 50% opacity for watermark visibility */
    border: 1px solid rgba(221, 221, 221, 0.6);
    border-radius: 4px;
    padding: 1em;
    font-size: 8pt;
    line-height: 1.4;
    white-space: pre-wrap;       /* Wrap long lines */
    word-wrap: break-word;       /* Break words if needed */
    overflow-wrap: break-word;
    max-width: 100%;
    overflow-x: hidden;          /* Hide horizontal overflow */
}

pre code {
    background-color: transparent;
    padding: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
}

/* Syntax highlighting - GitHub-style colors */
/* Handle both Pygments output: <div class="highlight"><pre>...</pre></div> */
/* And non-Pygments output: <pre class="highlight"><code>...</code></pre> */
.highlight pre,
pre.highlight,
div.highlight pre {
    background-color: rgba(248, 248, 248, 0.5);
    padding: 1em;
    border-radius: 4px;
    overflow-x: auto;
    border: 1px solid rgba(221, 221, 221, 0.6);
}

/* Pygments wraps code in a div.highlight */
div.highlight {
    margin: 1em 0;
}
.highlight .hll { background-color: #ffffcc }
.highlight .c { color: #6a737d; font-style: italic } /* Comment */
.highlight .k { color: #d73a49; font-weight: bold } /* Keyword */
.highlight .kd { color: #d73a49; font-weight: bold } /* Keyword.Declaration */
.highlight .kn { color: #d73a49; font-weight: bold } /* Keyword.Namespace */
.highlight .kp { color: #d73a49 } /* Keyword.Pseudo */
.highlight .kr { color: #d73a49; font-weight: bold } /* Keyword.Reserved */
.highlight .kt { color: #d73a49 } /* Keyword.Type */
.highlight .n { color: #24292e } /* Name */
.highlight .na { color: #6f42c1 } /* Name.Attribute */
.highlight .nb { color: #005cc5 } /* Name.Builtin */
.highlight .nc { color: #6f42c1; font-weight: bold } /* Name.Class */
.highlight .nf { color: #6f42c1 } /* Name.Function */
.highlight .ni { color: #735c0f } /* Name.Entity */
.highlight .nn { color: #6f42c1 } /* Name.Namespace */
.highlight .nt { color: #22863a } /* Name.Tag */
.highlight .nv { color: #e36209 } /* Name.Variable */
.highlight .o { color: #d73a49 } /* Operator */
.highlight .ow { color: #d73a49; font-weight: bold } /* Operator.Word */
.highlight .p { color: #24292e } /* Punctuation */
.highlight .s { color: #032f62 } /* String */
.highlight .s1 { color: #032f62 } /* String.Single */
.highlight .s2 { color: #032f62 } /* String.Double */
.highlight .sb { color: #032f62 } /* String.Backtick */
.highlight .sc { color: #032f62 } /* String.Char */
.highlight .sd { color: #032f62 } /* String.Doc */
.highlight .se { color: #032f62 } /* String.Escape */
.highlight .sh { color: #032f62 } /* String.Heredoc */
.highlight .si { color: #032f62 } /* String.Interpol */
.highlight .sr { color: #032f62 } /* String.Regex */
.highlight .ss { color: #005cc5 } /* String.Symbol */
.highlight .m { color: #005cc5 } /* Number */
.highlight .mi { color: #005cc5 } /* Number.Integer */
.highlight .mf { color: #005cc5 } /* Number.Float */
.highlight .mh { color: #005cc5 } /* Number.Hex */
.highlight .mo { color: #005cc5 } /* Number.Oct */
.highlight .il { color: #005cc5 } /* Number.Integer.Long */
.highlight .cm { color: #6a737d; font-style: italic } /* Comment.Multiline */
.highlight .cp { color: #6a737d } /* Comment.Preproc */
.highlight .c1 { color: #6a737d; font-style: italic } /* Comment.Single */
.highlight .cs { color: #6a737d; font-style: italic } /* Comment.Special */
.highlight .ge { font-style: italic } /* Generic.Emph */
.highlight .gs { font-weight: bold } /* Generic.Strong */
.highlight .err { color: #b31d28; background-color: #ffeef0 } /* Error */

blockquote {
    border-left: 4px solid #e74c3c;
    margin: 1em 0;
    padding: 0.5em 1em;
    background-color: rgba(250, 250, 250, 0.8);  /* Semi-transparent for watermark */
    font-style: italic;
}

/* Tables - improved styling */
table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
    font-size: 9pt;
    table-layout: fixed;         /* Fixed layout for better column control */
    word-wrap: break-word;
}

th, td {
    border: 1px solid #ddd;
    padding: 0.4em 0.6em;
    text-align: left;
    word-wrap: break-word;
    overflow-wrap: break-word;
    vertical-align: top;
}

th {
    background-color: #e74c3c;
    color: white;
    font-weight: bold;
}

tr:nth-child(even) {
    background-color: rgba(249, 249, 249, 0.8);  /* Semi-transparent for watermark */
}

/* Make first column narrower if it's a parameter/key column */
td:first-child, th:first-child {
    width: 25%;
}

ul, ol {
    margin: 0.8em 0;
    padding-left: 2em;
}

li {
    margin: 0.3em 0;
    word-wrap: break-word;
}

a {
    color: #e74c3c;
    text-decoration: none;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

a:hover {
    text-decoration: underline;
}

hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 2em 0;
}

img {
    max-width: 100%;
    height: auto;
}

mark {
    background-color: #fff3b0;
    color: inherit;
    padding: 0.1em 0.2em;
    border-radius: 2px;
}

/* Mermaid diagram container */
.mermaid-diagram {
    text-align: center;
    margin: 1em 0;
}

.mermaid-diagram img {
    width: 100%;
    height: auto;
    max-height: 200mm;
    object-fit: contain;
}

/* Mermaid fallback (code block) */
.mermaid-code {
    background-color: rgba(240, 244, 248, 0.5);  /* 50% opacity for watermark visibility */
    border: 1px solid rgba(204, 204, 221, 0.6);
    border-left: 4px solid #667;
    padding: 1em;
    font-family: monospace;
    font-size: 8pt;
    white-space: pre-wrap;
    color: #445;
}

.mermaid-code::before {
    content: "Mermaid Diagram (install mmdc to render):";
    display: block;
    font-weight: bold;
    margin-bottom: 0.5em;
    color: #667;
    font-size: 9pt;
}
"""


def extract_title_from_markdown(md_content: str) -> str:
    """Extract the first H1 title from markdown content.

    Args:
        md_content: Markdown content string

    Returns:
        Title string or 'Document' if no H1 found
    """
    # Match # Title or Title\n=====
    h1_pattern = r'^#\s+(.+?)$|^(.+?)\n=+$'
    match = re.search(h1_pattern, md_content, re.MULTILINE)
    if match:
        return (match.group(1) or match.group(2)).strip()
    return 'Document'


def convert_image_to_png(image_path: str) -> io.BytesIO:
    """Convert any image format to PNG bytes.

    Args:
        image_path: Path to the image file

    Returns:
        PNG image as BytesIO buffer
    """
    img = Image.open(image_path)
    # Convert to RGBA if needed
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    # Save to bytes buffer as PNG
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    buffer.seek(0)
    return buffer


def check_mermaid_cli() -> bool:
    """Check if mermaid-cli (mmdc) is installed."""
    try:
        result = subprocess.run(['mmdc', '--version'], capture_output=True, timeout=5)
        return result.returncode == 0
    except (subprocess.SubprocessError, FileNotFoundError):
        return False


def install_mermaid_cli() -> bool:
    """Attempt to install mermaid-cli via npm.

    Returns:
        True if installation successful, False otherwise
    """
    print("Mermaid CLI not found. Attempting to install...")

    # Check if npm is available
    try:
        npm_check = subprocess.run(['npm', '--version'], capture_output=True, timeout=10)
        if npm_check.returncode != 0:
            print("npm not found. Cannot auto-install mermaid-cli.")
            return False
    except (subprocess.SubprocessError, FileNotFoundError):
        print("npm not found. Cannot auto-install mermaid-cli.")
        return False

    # Install mermaid-cli globally
    try:
        print("Running: npm install -g @mermaid-js/mermaid-cli")
        result = subprocess.run(
            ['npm', 'install', '-g', '@mermaid-js/mermaid-cli'],
            capture_output=True,
            timeout=120  # 2 minutes timeout for installation
        )
        if result.returncode == 0:
            print("Mermaid CLI installed successfully!")
            return True
        else:
            stderr = result.stderr.decode('utf-8', errors='ignore')
            print(f"Installation failed: {stderr}")
            return False
    except subprocess.TimeoutExpired:
        print("Installation timed out.")
        return False
    except (subprocess.SubprocessError, FileNotFoundError) as e:
        print(f"Installation error: {e}")
        return False


def ensure_mermaid_cli() -> bool:
    """Ensure mermaid-cli is available, installing if necessary.

    Returns:
        True if mmdc is available, False otherwise
    """
    if check_mermaid_cli():
        return True

    # Try to install
    if install_mermaid_cli():
        # Verify installation worked
        return check_mermaid_cli()

    return False


def render_mermaid_diagram_svg(mermaid_code: str, output_path: str) -> bool:
    """Render mermaid diagram to SVG (vector, infinite resolution).

    Args:
        mermaid_code: Mermaid diagram code
        output_path: Output SVG file path

    Returns:
        True if successful, False otherwise
    """
    try:
        with tempfile.NamedTemporaryFile(mode='w', suffix='.mmd', delete=False) as f:
            f.write(mermaid_code)
            input_path = f.name

        result = subprocess.run(
            ['mmdc', '-i', input_path, '-o', output_path, '-b', 'transparent'],
            capture_output=True,
            timeout=60
        )

        os.unlink(input_path)
        return result.returncode == 0 and Path(output_path).exists()
    except (subprocess.SubprocessError, FileNotFoundError, OSError):
        return False


def render_mermaid_diagram(mermaid_code: str, output_path: str) -> bool:
    """Render mermaid diagram to high-resolution PNG (5x scale fallback).

    Args:
        mermaid_code: Mermaid diagram code
        output_path: Output PNG file path

    Returns:
        True if successful, False otherwise
    """
    try:
        with tempfile.NamedTemporaryFile(mode='w', suffix='.mmd', delete=False) as f:
            f.write(mermaid_code)
            input_path = f.name

        # 5x scale = very high resolution source for crisp downscaling in PDF
        result = subprocess.run(
            ['mmdc', '-i', input_path, '-o', output_path, '-b', 'transparent', '-s', '5'],
            capture_output=True,
            timeout=60
        )

        os.unlink(input_path)
        return result.returncode == 0
    except (subprocess.SubprocessError, FileNotFoundError, OSError):
        return False


def preprocess_mermaid(md_content: str, temp_dir: Path) -> str:
    """Pre-process mermaid code blocks and convert to images.

    Args:
        md_content: Markdown content string
        temp_dir: Temporary directory for generated images

    Returns:
        Modified markdown with mermaid blocks replaced by images or styled code
    """
    # Auto-install mermaid-cli if not found
    has_mmdc = ensure_mermaid_cli()

    # Pattern to match mermaid code blocks
    mermaid_pattern = r'```mermaid\s*\n(.*?)\n```'

    def replace_mermaid(match):
        mermaid_code = match.group(1)
        diagram_id = hash(mermaid_code) & 0xFFFFFFFF

        if has_mmdc:
            # PNG at 5x scale: fonts are rasterized and visible (SVG omits fonts in WeasyPrint)
            png_path = temp_dir / f"mermaid_{diagram_id}.png"
            if render_mermaid_diagram(mermaid_code, str(png_path)):
                return f'\n<div class="mermaid-diagram"><img src="{png_path}" alt="Mermaid Diagram"></div>\n'

        # Fallback: styled code block
        escaped_code = mermaid_code.replace('<', '&lt;').replace('>', '&gt;')
        return f'\n<div class="mermaid-code">{escaped_code}</div>\n'

    return re.sub(mermaid_pattern, replace_mermaid, md_content, flags=re.DOTALL)


def fix_table_formatting(md_content: str) -> str:
    """Fix common table formatting issues.

    Args:
        md_content: Markdown content string

    Returns:
        Fixed markdown content
    """
    lines = md_content.split('\n')
    result = []
    in_table = False
    table_lines = []

    for i, line in enumerate(lines):
        # Check if line looks like a table row
        stripped = line.strip()
        is_table_row = stripped.startswith('|') and stripped.endswith('|')
        is_separator = bool(re.match(r'^\|[\s\-:|]+\|$', stripped))

        if is_table_row or is_separator:
            if not in_table:
                in_table = True
                # Add blank line before table if needed
                if result and result[-1].strip():
                    result.append('')
            table_lines.append(line)
        else:
            if in_table:
                # End of table, process it
                if len(table_lines) >= 2:
                    # Ensure separator line exists and is valid
                    has_separator = False
                    for j, tl in enumerate(table_lines):
                        if re.match(r'^\s*\|[\s\-:|]+\|\s*$', tl):
                            has_separator = True
                            break

                    if not has_separator and len(table_lines) >= 1:
                        # Add separator after header
                        header = table_lines[0]
                        col_count = header.count('|') - 1
                        separator = '|' + '---|' * col_count
                        table_lines.insert(1, separator)

                result.extend(table_lines)
                # Add blank line after table
                if stripped:
                    result.append('')
                table_lines = []
                in_table = False

            result.append(line)

    # Handle table at end of file
    if table_lines:
        result.extend(table_lines)

    return '\n'.join(result)


def create_header_footer_pdf(
    output_path: str,
    num_pages: int,
    title: str = 'Document',
    header_logo_path: str = None,
    show_footer: bool = True
) -> str:
    """Create a PDF with header and footer for all pages.

    Args:
        output_path: Path for the output PDF
        num_pages: Number of pages to create
        title: Document title for header (right side)
        header_logo_path: Path to logo image for header (left side)
        show_footer: Whether to show page numbers in footer

    Returns:
        Path to the created PDF
    """
    c = canvas.Canvas(output_path, pagesize=A4)

    # Header Y position (from top)
    header_y = A4_HEIGHT_PT - MARGIN_TOP + 15
    # Footer Y position (from bottom)
    footer_y = MARGIN_BOTTOM - 20

    # Load header logo if provided
    header_logo = None
    logo_width = 0
    logo_height = HEADER_LOGO_HEIGHT

    if header_logo_path and Path(header_logo_path).exists():
        try:
            # Convert image to PNG (handles webp, jpg, etc.)
            png_buffer = convert_image_to_png(header_logo_path)
            header_logo = ImageReader(png_buffer)

            # Get original dimensions and calculate scaled width
            img = Image.open(header_logo_path)
            orig_width, orig_height = img.size
            scale = logo_height / orig_height
            logo_width = orig_width * scale
        except Exception as e:
            print(f"Warning: Could not load header logo: {e}")

    for page_num in range(1, num_pages + 1):
        # Draw header
        c.saveState()

        # Header logo (left side)
        if header_logo:
            # Need to recreate ImageReader for each page
            png_buffer = convert_image_to_png(header_logo_path)
            logo_reader = ImageReader(png_buffer)
            c.drawImage(
                logo_reader,
                MARGIN_LEFT,
                header_y - logo_height + 5,
                width=logo_width,
                height=logo_height,
                mask='auto'
            )

        # Header title (right side)
        c.setFont("Helvetica", 10)
        c.setFillColor(Color(0.2, 0.2, 0.2, 1))

        # Truncate title if too long
        max_title_width = A4_WIDTH_PT - MARGIN_LEFT - MARGIN_RIGHT - logo_width - 20
        display_title = title
        while c.stringWidth(display_title, "Helvetica", 10) > max_title_width and len(display_title) > 10:
            display_title = display_title[:-4] + "..."

        title_width = c.stringWidth(display_title, "Helvetica", 10)
        c.drawString(
            A4_WIDTH_PT - MARGIN_RIGHT - title_width,
            header_y - 5,
            display_title
        )

        # Header line
        c.setStrokeColor(ENOUVO_RED)
        c.setLineWidth(1)
        c.line(
            MARGIN_LEFT,
            header_y - HEADER_LOGO_HEIGHT - 5,
            A4_WIDTH_PT - MARGIN_RIGHT,
            header_y - HEADER_LOGO_HEIGHT - 5
        )

        c.restoreState()

        # Draw footer
        if show_footer:
            c.saveState()

            # Footer line
            c.setStrokeColor(Color(0.8, 0.8, 0.8, 1))
            c.setLineWidth(0.5)
            c.line(
                MARGIN_LEFT,
                footer_y + 15,
                A4_WIDTH_PT - MARGIN_RIGHT,
                footer_y + 15
            )

            # Page number (centered)
            c.setFont("Helvetica", 9)
            c.setFillColor(Color(0.5, 0.5, 0.5, 1))
            page_text = f"Page {page_num} of {num_pages}"
            text_width = c.stringWidth(page_text, "Helvetica", 9)
            c.drawString(
                (A4_WIDTH_PT - text_width) / 2,
                footer_y,
                page_text
            )

            c.restoreState()

        # New page (except for last page)
        if page_num < num_pages:
            c.showPage()

    c.save()
    return output_path


def create_watermark_pdf(
    image_path: str,
    output_path: str,
    num_pages: int,
    opacity: float = 0.08
) -> str:
    """Create a multi-page watermark PDF from an image.

    Args:
        image_path: Path to the watermark image (PNG, JPG, etc.)
        output_path: Path for the output watermark PDF
        num_pages: Number of pages to create (should match content pages)
        opacity: Watermark opacity (0.0 to 1.0, default 0.08 for subtle effect)

    Returns:
        Path to the created watermark PDF
    """
    # Get dimensions from original image
    img = Image.open(image_path)
    img_width, img_height = img.size

    # Calculate size for watermark (centered, about 40% of page width)
    target_width = A4_WIDTH_PT * 0.4
    scale = target_width / img_width
    scaled_width = img_width * scale
    scaled_height = img_height * scale

    # Center position
    x = (A4_WIDTH_PT - scaled_width) / 2
    y = (A4_HEIGHT_PT - scaled_height) / 2

    # Create PDF canvas
    c = canvas.Canvas(output_path, pagesize=A4)

    for page_num in range(num_pages):
        # Convert image to PNG (handles webp, jpg, etc.)
        # Need to recreate buffer for each page
        png_buffer = convert_image_to_png(image_path)
        img_reader = ImageReader(png_buffer)

        # Set opacity for watermark
        c.saveState()
        c.setFillAlpha(opacity)
        c.setStrokeAlpha(opacity)

        # Draw image
        c.drawImage(img_reader, x, y, width=scaled_width, height=scaled_height, mask='auto')

        c.restoreState()

        # New page (except for last page)
        if page_num < num_pages - 1:
            c.showPage()

    c.save()
    return output_path


def convert_md_to_html(md_content: str, temp_dir: Path = None) -> str:
    """Convert markdown content to HTML.

    Args:
        md_content: Markdown content string
        temp_dir: Temporary directory for mermaid images (optional)

    Returns:
        HTML string
    """
    # Pre-process mermaid diagrams if temp_dir provided
    if temp_dir:
        md_content = preprocess_mermaid(md_content, temp_dir)

    # Fix table formatting issues
    md_content = fix_table_formatting(md_content)

    # Ensure pymdownx is available for proper code block handling
    # pymdownx.superfences handles indented code blocks in list items correctly
    has_superfences = ensure_pymdownx()

    # Enable common markdown extensions with proper configuration
    extensions = [
        'markdown.extensions.tables',
        'markdown.extensions.toc',
        'markdown.extensions.meta',
        'markdown.extensions.sane_lists',
        'markdown.extensions.attr_list',
        'markdown.extensions.nl2br',  # Convert newlines to <br> tags
    ]

    extension_configs = {}

    if has_superfences:
        # Use pymdownx.superfences for better code block handling
        # (handles indented code blocks inside list items)
        # nl2br works correctly with superfences (doesn't break code blocks)
        extensions.append('pymdownx.superfences')
        extension_configs['pymdownx.superfences'] = {
            'preserve_tabs': True,
        }
        # pymdownx.mark: renders ==highlighted text== with <mark> tag
        extensions.append('pymdownx.mark')
    else:
        # Fallback to standard fenced_code (limited support for indented blocks)
        # Note: nl2br may cause issues with standard fenced_code
        extensions.remove('markdown.extensions.nl2br')
        extensions.append('markdown.extensions.fenced_code')
        extensions.append('markdown.extensions.codehilite')
        extension_configs['markdown.extensions.codehilite'] = {
            'css_class': 'highlight',
            'guess_lang': True,
            'linenums': False,
        }

    md = markdown.Markdown(extensions=extensions, extension_configs=extension_configs)
    html_content = md.convert(md_content)

    # Wrap in HTML document
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
{html_content}
</body>
</html>"""

    return html


def html_to_pdf(html_content: str, output_path: str, css: str = None, base_url: str = None) -> str:
    """Convert HTML to PDF using WeasyPrint.

    Args:
        html_content: HTML content string
        output_path: Output PDF path
        css: Optional CSS string (uses DEFAULT_CSS if not provided)
        base_url: Base URL for resolving relative paths (for images)

    Returns:
        Path to the created PDF
    """
    css_content = css or DEFAULT_CSS

    html_doc = HTML(string=html_content, base_url=base_url)
    css_doc = CSS(string=css_content)

    html_doc.write_pdf(output_path, stylesheets=[css_doc])

    return output_path


def merge_overlay_pdfs(base_pdf: str, overlay_pdf: str, output_path: str, over: bool = True) -> str:
    """Merge overlay PDF onto base PDF.

    Args:
        base_pdf: Path to the base PDF
        overlay_pdf: Path to the overlay PDF
        output_path: Path for the output PDF
        over: If True, overlay goes on top; if False, goes underneath

    Returns:
        Path to the merged PDF
    """
    base_reader = PdfReader(base_pdf)
    overlay_reader = PdfReader(overlay_pdf)
    writer = PdfWriter()

    for i, page in enumerate(base_reader.pages):
        if i < len(overlay_reader.pages):
            overlay_page = overlay_reader.pages[i]
            if over:
                page.merge_page(overlay_page)
            else:
                # Create a new page with overlay underneath
                overlay_page.merge_page(page)
                page = overlay_page
        writer.add_page(page)

    with open(output_path, 'wb') as f:
        writer.write(f)

    return output_path


def md_to_pdf(
    input_path: str,
    output_path: str = None,
    watermark_path: str = None,
    header_logo_path: str = None,
    custom_title: str = None,
    css: str = None,
    watermark_opacity: float = 0.08,
    show_footer: bool = True
) -> str:
    """Convert markdown file to PDF with optional watermark, header, and footer.

    Args:
        input_path: Path to the markdown file
        output_path: Output PDF path (defaults to input_path with .pdf extension)
        watermark_path: Optional path to watermark image (PNG, JPG, WEBP)
        header_logo_path: Optional path to header logo image
        custom_title: Optional custom title (defaults to first H1 in markdown)
        css: Optional CSS string for styling
        watermark_opacity: Watermark opacity (0.0 to 1.0)
        show_footer: Whether to show page numbers in footer

    Returns:
        Path to the created PDF
    """
    input_path = Path(input_path)

    if not input_path.exists():
        raise FileNotFoundError(f"Input file not found: {input_path}")

    # Default output path
    if output_path is None:
        output_path = input_path.with_suffix('.pdf')
    output_path = Path(output_path)

    # Read markdown content
    md_content = input_path.read_text(encoding='utf-8')

    # Extract title from markdown if not provided
    title = custom_title or extract_title_from_markdown(md_content)

    # Create temp directory for intermediate files
    with tempfile.TemporaryDirectory() as temp_dir:
        temp_dir = Path(temp_dir)
        content_pdf = temp_dir / "content.pdf"

        # Convert MD to HTML (with mermaid preprocessing)
        html_content = convert_md_to_html(md_content, temp_dir)

        # Convert HTML to PDF with base_url for image resolution
        html_to_pdf(html_content, str(content_pdf), css, base_url=str(temp_dir))

        # Get page count
        reader = PdfReader(str(content_pdf))
        num_pages = len(reader.pages)

        current_pdf = content_pdf

        # Add watermark if provided (now creates multi-page watermark)
        if watermark_path:
            watermark_path_obj = Path(watermark_path)
            if not watermark_path_obj.exists():
                raise FileNotFoundError(f"Watermark image not found: {watermark_path}")

            watermark_pdf = temp_dir / "watermark.pdf"
            # Create watermark with same number of pages as content
            create_watermark_pdf(str(watermark_path), str(watermark_pdf), num_pages, watermark_opacity)

            watermarked_pdf = temp_dir / "watermarked.pdf"
            merge_overlay_pdfs(str(current_pdf), str(watermark_pdf), str(watermarked_pdf), over=False)
            current_pdf = watermarked_pdf

        # Add header/footer if header logo provided or footer requested
        if header_logo_path or show_footer:
            header_footer_pdf = temp_dir / "header_footer.pdf"
            create_header_footer_pdf(
                str(header_footer_pdf),
                num_pages,
                title=title,
                header_logo_path=header_logo_path,
                show_footer=show_footer
            )

            final_pdf = temp_dir / "final.pdf"
            merge_overlay_pdfs(str(current_pdf), str(header_footer_pdf), str(final_pdf), over=True)
            current_pdf = final_pdf

        # Copy final PDF to output
        shutil.copy(str(current_pdf), str(output_path))

    return str(output_path)


def main():
    parser = argparse.ArgumentParser(
        description='Convert Markdown to PDF with optional watermark, header, and footer',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    %(prog)s document.md
    %(prog)s document.md output.pdf
    %(prog)s document.md --watermark watermark.png
    %(prog)s document.md --header-logo logo.png
    %(prog)s document.md --header-logo logo.webp --watermark watermark.png
    %(prog)s document.md --header-logo logo.png --title "My Document"
    %(prog)s document.md --no-footer

Features:
    - Automatic text wrapping for long URLs and code
    - Table rendering with styled headers
    - Mermaid diagram support (requires: npm install -g @mermaid-js/mermaid-cli)
    - Watermark on all pages
    - Header with logo and document title
    - Footer with page numbers
        """
    )

    parser.add_argument('input', help='Input markdown file path')
    parser.add_argument('output', nargs='?', help='Output PDF file path (default: input.pdf)')
    parser.add_argument(
        '--watermark', '-w',
        help='Path to watermark image (PNG, JPG, WEBP)'
    )
    parser.add_argument(
        '--header-logo', '-l',
        help='Path to header logo image (left side of header)'
    )
    parser.add_argument(
        '--title', '-t',
        help='Document title for header (default: first H1 from markdown)'
    )
    parser.add_argument(
        '--opacity', '-o',
        type=float,
        default=0.08,
        help='Watermark opacity (0.0-1.0, default: 0.08)'
    )
    parser.add_argument(
        '--css', '-c',
        help='Path to custom CSS file'
    )
    parser.add_argument(
        '--no-footer',
        action='store_true',
        help='Disable page numbers in footer'
    )

    args = parser.parse_args()

    # Check for mermaid support (will auto-install during conversion if needed)
    if check_mermaid_cli():
        print("Mermaid CLI detected - diagrams will be rendered")
    else:
        print("Note: Mermaid CLI not found - will attempt auto-install when diagrams are detected")

    # Check for Pygments (syntax highlighting) - auto-install if needed
    if ensure_pygments():
        print("Pygments detected - code syntax highlighting enabled")
    else:
        print("Warning: Pygments not available - code blocks will not have syntax highlighting")

    # Load custom CSS if provided
    css = None
    if args.css:
        css_path = Path(args.css)
        if css_path.exists():
            css = css_path.read_text(encoding='utf-8')
        else:
            print(f"Warning: CSS file not found: {args.css}, using default styles")

    try:
        output = md_to_pdf(
            input_path=args.input,
            output_path=args.output,
            watermark_path=args.watermark,
            header_logo_path=args.header_logo,
            custom_title=args.title,
            css=css,
            watermark_opacity=args.opacity,
            show_footer=not args.no_footer
        )
        print(f"PDF created: {output}")
    except FileNotFoundError as e:
        print(f"Error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Error converting file: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
