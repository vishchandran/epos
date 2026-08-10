# Documentation Diagrams

This directory contains the editable Mermaid sources for diagrams displayed in
the repository root README. Each `.mmd` file produces an SVG with the same
name.

After changing a source file, regenerate the SVGs from the repository root:

```bash
pnpm run docs:diagrams
```

Commit the related `.mmd`, `.svg`, and Markdown document changes together.
