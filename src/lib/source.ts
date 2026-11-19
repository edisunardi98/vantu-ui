import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createHighlighter, type Highlighter } from "shiki";

let highlighter: Promise<Highlighter> | null = null;

function getHighlighter() {
  highlighter ??= createHighlighter({ themes: ["github-light"], langs: ["tsx", "bash", "css", "json", "markdown"] });
  return highlighter;
}

/** Read a source file relative to src/. */
export async function readSource(relPath: string) {
  const file = path.join(process.cwd(), "src", relPath);
  return (await readFile(file, "utf8")).trimEnd();
}

export type CodeLang = "tsx" | "bash" | "css" | "json" | "markdown";

export async function highlight(code: string, lang: CodeLang = "tsx") {
  const h = await getHighlighter();
  // The highlighter is a long-lived singleton (it survives dev-server reloads), so a
  // language added after it was created may be missing — load it on demand.
  if (!h.getLoadedLanguages().includes(lang)) await h.loadLanguage(lang);
  return h.codeToHtml(code, { lang, theme: "github-light" });
}
