import { element } from "./dom";
import { projectIndex } from "../content/project-index";
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
    for (const { slug: project, thumbnailId, subtitle } of projectIndex) {
      const item = originalPages[project];
      if (!item?.images[0]) continue;
      const link = element("a", "original-project-tile");
      link.href = pageUrl(project);
      const title = item.text[0]?.replace(/\u200b/g, "") || project;
      link.setAttribute("aria-label", title);
      const thumbnail =
        data.images.find((image) =>
          image.source.includes(thumbnailId ?? "__none__"),
        ) ?? item.images[0];
      const caption = element("span", "original-project-title");
      caption.append(element("span", "", title));
      if (subtitle) caption.append(element("small", "", subtitle));
      link.append(imageFor(thumbnail), caption);
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
    const links: Record<number, string> = {
      9: "https://vmspace.com/project/project_view.html?base_seq=MzkzOA%3D%3D",
      1: pageUrl("stay-collection"),
      4: "https://youtu.be/hX-jwYajo28",
      7: "http://www.archinews.net/건축/작품소개/sea-essay",
      12: "https://www.archdaily.com/tag/top100/",
      17: "https://www.c3ka.com/marea-pool-villa-by-rieuldorang-architect-office/",
      20: "http://www.archinews.net/건축/작품소개/자연조각",
      23: "https://blog.naver.com/greenhouse4u/221363490184",
      25: "https://www.archdaily.com/972357/marea-house-rieuldorang-atelier?ad_source=search&ad_medium=projects_tab",
      28: "https://magazine.brique.co/project/청도-바오마루/",
      31: "https://www.youtube.com/watch?v=iSMVzu_HrFs",
      34: "https://magazine.brique.co/project/서동-팔콘-주택/",
    };
    for (const [title, date, description, image] of groups) {
      const row = element("article", "original-news-row");
      const url = links[title];
      if (data.images[image]) {
        const photo = imageFor(data.images[image]);
        if (url) {
          const link = element("a");
          link.href = url;
          link.setAttribute("aria-label", data.text[title]);
          link.append(photo);
          row.append(link);
        } else row.append(photo);
      }
      const copy = element("div", "original-news-copy");
      const heading = element("h2", "", data.text[title]);
      if (url) {
        const link = element("a");
        link.href = url;
        link.append(heading);
        copy.append(link);
      } else copy.append(heading);
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
    .filter(
      (text) =>
        ![">", "<", "Project Gallery", "​>", "​<"].includes(text) &&
        (slug === "ara-o-wall-house" ||
          text !== "강력한 사생활 보호를 위한 가벽"),
    )
    .forEach((text) => descriptions.append(textBlock(text)));
  const images = element("div", "original-detail-images");
  const inlineImages = data.images.slice(1).filter((item) => item.alt);
  const galleryImages = data.images.filter((item) => !item.alt);
  inlineImages.forEach((item) => images.append(imageFor(item)));
  content.append(descriptions, images);
  main.append(content);
  if (galleryImages.length) {
    const gallery = element("section", "original-gallery");
    gallery.append(element("h2", "", "Project Gallery"));
    const track = element("div", "original-gallery-track");
    galleryImages.forEach((item, index) => {
      const image = imageFor(item);
      image.alt =
        locale === "ko"
          ? `프로젝트 사진 ${index + 1}`
          : `Project photograph ${index + 1}`;
      track.append(image);
    });
    const controls = element("div", "original-gallery-controls");
    for (const [direction, label] of [
      [-1, "‹"],
      [1, "›"],
    ] as const) {
      const button = element("button", "", label);
      button.type = "button";
      button.setAttribute(
        "aria-label",
        direction < 0
          ? locale === "ko"
            ? "이전 사진"
            : "Previous photos"
          : locale === "ko"
            ? "다음 사진"
            : "Next photos",
      );
      button.addEventListener("click", () =>
        track.scrollBy({
          left: direction * track.clientWidth * 0.7,
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        }),
      );
      controls.append(button);
    }
    gallery.append(track, controls);
    main.append(gallery);
  }
  if (locale === "en") main.lang = "en";
  return main;
}
