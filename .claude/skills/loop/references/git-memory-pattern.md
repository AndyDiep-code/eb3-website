# Loop Memory Pattern

`.claude/loop-results.tsv` and `.claude/loop-backup/` are the loop's only persistent memory across iterations. Read them every time.

---

## Required Reads — Every Iteration

Run these at the start of Phase 1 (Review) without exception:

```bash
cat .claude/loop-results.tsv                      # metric trend + keep/discard record
cat .claude/loop-backup/iter-last/changes.txt     # exact description of last iteration's change (if exists)
```

Together these answer three questions:
1. **What worked?** (keep rows with positive delta)
2. **What failed?** (discard rows, repeated file paths in changes.txt)
3. **Where is the trend going?** (last 5 deltas — accelerating, flat, or reversing?)

---

## Pattern Recognition

### Exploit Successful Patterns

- Same file category that improved before → try adjacent files
- Same technique (e.g. adding edge-case tests) → apply to untouched functions
- Larger delta correlates with specific module → prioritize that module

### Avoid Failed Patterns

- File + technique combination that was discarded → do not retry same pair
- Zero-delta changes (e.g. refactors that don't move the metric) → skip unless required by guard
- Oscillating metric on a file → leave it, move elsewhere

### Detect Diminishing Returns

If last 5 kept iterations all have `delta < Min-Delta * 2`, the low-hanging fruit is gone. Signal:
- Broaden scope to adjacent files
- Switch technique entirely
- Report plateau to user rather than grinding

---

## Stuck Detection Integration

Track consecutive discards in a shell variable or temp file across phases:

```bash
CONSEC_DISCARDS=0   # reset on keep, increment on discard

# After Phase 6 decision:
if kept; then
  CONSEC_DISCARDS=0
else
  CONSEC_DISCARDS=$((CONSEC_DISCARDS + 1))
fi

# Phase 8 checks:
[ $CONSEC_DISCARDS -ge 5 ]  && shift_strategy
[ $CONSEC_DISCARDS -ge 10 ] && stop_loop
```

---

## Backup Directory Structure

```
.claude/loop-backup/
  iter-1/
    src/utils/parser.ts        # original file content before iter-1 change
    changes.txt                # "add null guard to parseToken in lexer.ts"
  iter-2/
    src/utils/lexer.ts
    changes.txt                # "split large test fixture into focused unit cases"
  iter-last -> iter-N          # symlink or note: which dir is current iteration
```

On **keep**: leave backup in place (historical record), advance iter counter.
On **discard**: restore files from backup, then advance iter counter.

---

## TSV Format

```
iteration	metric	delta	status	description
0	80.0	-	baseline	initial measurement
1	82.4	+2.4	keep	add null checks to parser.ts
2	82.4	+0.0	discard	extract helper function
3	84.7	+2.3	keep	add branch coverage to tokenizer edge cases
```

This record replaces git log as the authoritative experiment history. Never delete it mid-loop.
