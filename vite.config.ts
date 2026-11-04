import { defineConfig } from "vite";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** GitHub Pages에서 각 원본 경로를 새로고침해도 열리도록 진입 파일을 만듭니다. */
export default defineConfig({
  base: "/rieuldorang/",
  plugins: [
    {
      name: "original-page-entries",
      closeBundle() {
        const html = readFileSync("dist/index.html", "utf8").replace(
          '<div id="preloader">',
          '<div id="preloader" style="display:none">',
        );
        for (const file of readdirSync("src/content/pages")) {
          if (!file.endsWith(".json")) continue;
          const folder = join("dist", file.slice(0, -5));
          mkdirSync(folder, { recursive: true });
          writeFileSync(join(folder, "index.html"), html);
        }
      },
    },
  ],
});
