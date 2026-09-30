---
name: Python wheel compatibility
description: Replit Python runtime selection when project-pinned native wheels lag the default interpreter.
---

When package installation fails because a pinned native dependency has no wheel for the selected Python ABI, select an available project-compatible runtime before changing dependency versions. For this project, psycopg-binary 3.2.3 did not provide a CPython 3.14 wheel; Python 3.13 installed the existing dependency set.

**Why:** The project allows Python 3.13+, but that does not guarantee every pinned binary dependency supports the newest interpreter selected by the package installer. Raising dependency versions can trigger unrelated incompatibilities.

**How to apply:** Check the exact unsupported ABI and the project's declared Python range, then use an available compatible runtime module before changing locked dependency versions.