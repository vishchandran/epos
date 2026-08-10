# Architecture Diagrams

Each `.mmd` file is the editable Mermaid source for the SVG with the same name.
The architecture documents reference the SVGs so GitHub web and mobile clients
display diagrams without Mermaid rendering support.

After changing a diagram source, regenerate the committed SVGs from the
repository root:

```bash
pnpm run docs:diagrams
```

Review and commit the related `.mmd`, `.svg`, and Markdown document changes
together.
