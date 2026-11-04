/** 원본 페이지에 연결된 이미지와 내부 프로젝트 경로를 검사합니다. */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve, sep } from "node:path";

const contentDirectory = resolve("src/content/pages");
const imageDirectory = resolve("public/images/pages");
const files = readdirSync(contentDirectory).filter((file) =>
  file.endsWith(".json"),
);
const pages = new Map(
  files.map((file) => [
    file.slice(0, -5),
    JSON.parse(readFileSync(resolve(contentDirectory, file), "utf8")),
  ]),
);
const problems = [];
let references = 0;
let links = 0;
for (const [slug, page] of pages) {
  if (!Array.isArray(page.text) || !Array.isArray(page.images)) {
    problems.push(`${slug}: text 또는 images가 배열이 아닙니다.`);
    continue;
  }
  for (const image of page.images) {
    references += 1;
    const path = resolve(imageDirectory, image.file || "");
    if (!path.startsWith(imageDirectory + sep) || !existsSync(path)) {
      problems.push(`${slug}: 이미지 없음 ${image.file}`);
    }
  }
  for (const target of Object.values(page.navigation || {})) {
    links += 1;
    if (!pages.has(target)) problems.push(`${slug}: 연결 대상 없음 ${target}`);
  }
  for (const index of page.visibleTextIndices || []) {
    if (!Number.isInteger(index) || index < 0 || index >= page.text.length) {
      problems.push(`${slug}: 잘못된 본문 인덱스 ${index}`);
    }
  }
  const normalized = (text) =>
    text
      .replace(/\u200b/g, "")
      .replace(/\s+/g, " ")
      .trim();
  for (const [index, position] of Object.entries(
    page.desktopLayout?.texts || {},
  )) {
    if (!page.text[index])
      problems.push(`${slug}: 데스크톱 본문 없음 ${index}`);
    else if (
      position.renderText &&
      normalized(position.renderText) !== normalized(page.text[index])
    ) {
      problems.push(`${slug}: 원본 본문과 표시 본문이 다릅니다 ${index}`);
    }
  }
  const sources = new Set(page.images.map((image) => image.source));
  for (const source of Object.keys(page.desktopLayout?.images || {})) {
    if (!sources.has(source))
      problems.push(`${slug}: 데스크톱 이미지 참조 없음 ${source}`);
  }
  for (const index of Object.keys(page.mobileLayout?.texts || {})) {
    if (!page.text[index]) problems.push(`${slug}: 모바일 본문 없음 ${index}`);
  }
  for (const source of Object.keys(page.mobileLayout?.images || {})) {
    if (!sources.has(source))
      problems.push(`${slug}: 모바일 이미지 참조 없음 ${source}`);
  }
}
if (problems.length) {
  problems.forEach((problem) => console.error(problem));
  process.exitCode = 1;
} else {
  console.log(
    `${pages.size}개 페이지, 이미지 참조 ${references}개, 프로젝트 이동 링크 ${links}개 확인 완료`,
  );
}
