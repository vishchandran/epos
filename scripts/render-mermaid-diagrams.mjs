import { readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const documentationDirectory = join(repositoryRoot, "docs");

async function findMermaidFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(directory, entry.name);

      if (entry.isDirectory()) {
        return findMermaidFiles(entryPath);
      }

      return entry.isFile() && entry.name.endsWith(".mmd") ? [entryPath] : [];
    })
  );

  return files.flat().sort();
}

function renderDiagram(inputPath) {
  const outputPath = inputPath.replace(/\.mmd$/, ".svg");
  const command = join(
    repositoryRoot,
    "node_modules",
    ".bin",
    process.platform === "win32" ? "mmdc.cmd" : "mmdc"
  );

  return new Promise((resolvePromise, reject) => {
    const renderer = spawn(
      command,
      ["-i", inputPath, "-o", outputPath, "-b", "transparent"],
      {
        cwd: repositoryRoot,
        stdio: "inherit"
      }
    );

    renderer.on("error", reject);
    renderer.on("exit", (code) => {
      if (code === 0) {
        resolvePromise();
        return;
      }

      reject(new Error(`Mermaid rendering failed for ${inputPath}.`));
    });
  });
}

const files = await findMermaidFiles(documentationDirectory);

if (files.length === 0) {
  throw new Error("No Mermaid source files found.");
}

for (const file of files) {
  await renderDiagram(file);
}
