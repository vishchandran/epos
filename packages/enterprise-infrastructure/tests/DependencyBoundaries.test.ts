import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const packageDirectory = fileURLToPath(new URL("../../", import.meta.url));

const collectTypeScriptFiles = async (directory: string): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = `${directory}/${entry.name}`;

      if (entry.isDirectory()) {
        return collectTypeScriptFiles(path);
      }

      return entry.name.endsWith(".ts") ? [path] : [];
    })
  );

  return files.flat();
};

describe("layer dependency boundaries", () => {
  it.each(["enterprise-domain", "enterprise-application"])(
    "does not allow %s to import infrastructure",
    async (packageName) => {
      const sourceDirectory = `${packageDirectory}/${packageName}/src`;
      const sourceFiles = await collectTypeScriptFiles(sourceDirectory);
      const source = await Promise.all(
        sourceFiles.map((file) => readFile(file, "utf8"))
      );

      expect(source.join("\n")).not.toContain(
        "@epos/enterprise-infrastructure"
      );
    }
  );
});
