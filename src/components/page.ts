import { element } from "./dom";
import type { Locale } from "../content/translations";

type OriginalPage = {
  text: string[];
  images: { source: string; alt: string; file: string }[];
};
const imported = import.meta.glob<OriginalPage>("../content/pages/*.json", {
  eager: true,
  import: "default",
});
export const originalPages: Record<string, OriginalPage> = Object.fromEntries(
  Object.entries(imported).map(([path, data]) => [
    path
      .split("/")
      .pop()!
      .replace(/\.json$/, ""),
    data,
  ]),
);
export const pageUrl = (slug: string) =>
  `${import.meta.env.BASE_URL}${slug ? `${slug}/` : ""}`;

function imageFor(item: OriginalPage["images"][number]): HTMLImageElement {
  const image = element("img");
  image.src = `${import.meta.env.BASE_URL}images/pages/${item.file}`;
  image.alt = item.alt || "";
  image.loading = "lazy";
  return image;
}
function textBlock(text: string): HTMLElement {
  const block = element("p", "original-text", text.replace(/\u200b/g, ""));
  return block;
}

export function originalPage(slug: string, locale: Locale): HTMLElement | null {
  const data = originalPages[slug];
  if (!data) return null;
  const main = element("main", `original-page original-${slug}`);
  main.id = "main";
  if (slug === "contact") {
    const section = element("section", "original-contact");
    data.text.forEach((text) => section.append(textBlock(text)));
    main.append(section);
    return main;
  }
  if (slug === "about-us") {
    const top = element("section", "original-about-top");
    if (data.images[0]) top.append(imageFor(data.images[0]));
    const bio = element("div", "original-bio");
    data.text.slice(0, 3).forEach((text) => bio.append(textBlock(text)));
    top.append(bio);
    main.append(top);
    data.text.slice(3).forEach((text) => main.append(textBlock(text)));
    return main;
  }
  if (slug === "projects-rieuldorang") {
    const gallery = element("div", "original-project-grid");
    const projectSlugs = [
      "ara-o-wall-house",
      "sea-essay",
      "oad-hotel",
      "dorang-de-ville",
      "gureung-dowon",
      "maemisong",
      "marea",
      "jayeon-jogak",
      "aphae-de-sel",
      "with-home",
      "mindeulle-kindergarten",
      "baomaru",
      "botongi-jib",
      "villa-ville-kulla",
      "namhae-house",
      "who-owns-the-space",
      "stay-hadamdam",
      "sihieung-ri-villa",
    ];
    const thumbnailIds = [
      "4f5dda60af7c40fd9461267ded438e51",
      "79630d5e40124530ad38ea77c66fc892",
      "7e6d81eba3334ff697053098dfe523ee",
      "1a479fd0233e477f971ad6536799746c",
      "8a3356d19e5c483185b5ab40769ca629",
      "dbe3c5497ff44033ae33e207e8262176",
      "813d0c5a6f1142a880e4ecc1a91c4147",
      "aa9304870a024a47ae5c295b8470e1ea",
      "15296a0fa5494e69820dc8d8fcff0bbc",
      "ca437be6b19b47fc879fc41f27bfe87c",
      "4db8a3048a2242dfa3ba648a996df551",
      "fd0af9aaafb247d28b442a6b64988e96",
      "24c3253ee7524649845e0c611036a467",
      "c5cb6c380a0644739aaaa6a3e18af115",
      "27c829a97f26453cb9d56c16ee9e6ae9",
      "92f2dfb9d9ad4ae68910a6eaf4aea16f",
    ];
    for (const [index, project] of projectSlugs.entries()) {
      const item = originalPages[project];
      if (!item?.images[0]) continue;
      const link = element("a", "original-project-tile");
      link.href = pageUrl(project);
      const title = item.text[0]?.replace(/\u200b/g, "") || project;
      link.setAttribute("aria-label", title);
      const thumbnail =
        data.images.find((image) =>
          image.source.includes(thumbnailIds[index] ?? "__none__"),
        ) ?? item.images[0];
      link.append(
        imageFor(thumbnail),
        element("span", "original-project-title", title),
      );
      gallery.append(link);
    }
    main.append(gallery);
    return main;
  }
  if (slug === "news") {
    main.append(element("h1", "", "Media"));
    const listing = element("section", "original-news-list");
    // 원본 Wix 페이지의 시각적 배치 순서. 숫자는 수집한 원본 본문과 이미지 인덱스입니다.
    const groups: Array<[number, number | null, number, number]> = [
      [14, 15, 16, 5],
      [9, 10, 11, 3],
      [1, 2, 3, 0],
      [4, 5, 6, 1],
      [7, null, 8, 2],
      [12, null, 13, 4],
      [17, 18, 19, 6],
      [20, 21, 22, 7],
      [23, null, 24, 8],
      [25, 26, 27, 9],
      [28, 29, 30, 10],
      [31, 32, 33, 11],
      [34, 35, 36, 12],
      [37, 38, 39, 13],
    ];
    for (const [title, date, description, image] of groups) {
      const row = element("article", "original-news-row");
      if (data.images[image]) row.append(imageFor(data.images[image]));
      const copy = element("div", "original-news-copy");
      copy.append(element("h2", "", data.text[title]));
      if (date !== null)
        copy.append(element("p", "original-news-date", data.text[date]));
      copy.append(textBlock(data.text[description]));
      row.append(copy);
      listing.append(row);
    }
    main.append(listing);
    const book = element("section", "original-news-book");
    book.append(element("h2", "", data.text[40]));
    data.images.slice(14).forEach((image) => book.append(imageFor(image)));
    main.append(book);
    const awards = element("section", "original-awards");
    awards.append(element("h2", "", data.text[41]));
    data.text.slice(42).forEach((text) => awards.append(textBlock(text)));
    main.append(awards);
    return main;
  }
  const hero = element("section", "original-detail-hero");
  if (data.images[0]) hero.append(imageFor(data.images[0]));
  const info = element("div", "original-detail-info");
  const name = element("div", "original-detail-name");
  data.text.slice(0, 2).forEach((text) => name.append(textBlock(text)));
  info.append(name);
  if (data.text[2]) info.append(textBlock(data.text[2]));
  hero.append(info);
  main.append(hero);
  const content = element("section", "original-detail-content");
  const descriptions = element("div", "original-descriptions");
  data.text
    .slice(3)
    .filter((text) => text !== ">" && text !== "Project Gallery")
    .forEach((text) => descriptions.append(textBlock(text)));
  const images = element("div", "original-detail-images");
  data.images.slice(1).forEach((item) => images.append(imageFor(item)));
  content.append(descriptions, images);
  main.append(content);
  if (locale === "en") main.lang = "en";
  return main;
}
