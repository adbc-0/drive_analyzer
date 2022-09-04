## Goal: Analyze device drive (Create treemap or other visualization of data found on drive)

Performance optimizations:
- Recursive approach could lead to stack overflow for deeply nested files
- Select how much you want limit scanning (lazy evaluation for greyed out sections)
- Don't keep full graph in memory
- Skip scanning system dirs
- Show progress to the user

FEATURES:
- Get path
- Open in finder
- Delete files
- Compress files
- Evaluate missing files
