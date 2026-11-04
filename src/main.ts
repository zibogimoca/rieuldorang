import "./styles/main.css";
import "./styles/motion.css";
import { initializeMotion } from "./components/motion";
import { buildings } from "./content/buildings";
import { introductions } from "./content/about";
import { news } from "./content/news";
import { site } from "./content/site";
import { buildingList } from "./components/building-list";
import { element } from "./components/dom";

import { translations, type Locale } from "./content/translations";

let locale: Locale =
  new URLSearchParams(location.search).get("lang") === "en" ? "en" : "ko";

let disposeMotion = () => {};

function render(): void {
  disposeMotion();
  const t = translations[locale];
  document.documentElement.lang = locale;
  document.title =
    locale === "ko"
      ? "리을도랑 — 건축과 공간"
      : "Rieuldorang — Architecture & Spaces";
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.replaceChildren();
  const skip = element("a", "skip-link", t.skip);
  skip.href = "#main";
  const header = element("header", "site-header");
  const logo = element("a", "logo", site.name);
  logo.href = "#";
  const nav = element("nav");
  nav.setAttribute("aria-label", t.menu);
  for (const [text, href] of [
    [t.projects, "#spaces"],
    [t.news, "#news"],
    [t.contact, "https://www.rieuldorang.com/contact"],
  ]) {
    const link = element("a", "", text);
    link.href = href;
    nav.append(link);
  }
  const language = element("div", "language-switch");
  language.setAttribute("role", "group");
  language.setAttribute("aria-label", t.language);
  for (const [code, label] of [
    ["ko", "KO"],
    ["en", "EN"],
  ] as const) {
    const button = element("button", "", label);
    button.type = "button";
    button.setAttribute("aria-pressed", String(locale === code));
    button.addEventListener("click", () => {
      locale = code;
      const url = new URL(location.href);
      url.searchParams.set("lang", code);
      history.replaceState(null, "", url);
      render();
      document
        .querySelector<HTMLButtonElement>(`button[aria-pressed="true"]`)
        ?.focus({ preventScroll: true });
    });
    language.append(button);
  }
  nav.append(language);
  header.append(logo, nav);
  const main = element("main");
  main.id = "main";
  // 원본 순서: 메인 문구 → 최근 프로젝트 → 대표 소개 → 뉴스.
  const hero = element("section", "hero");
  hero.append(element("p", "eyebrow", t.eyebrow));
  const title = element("h1");
  site.headline.forEach((line) => title.append(element("span", "", line)));
  hero.append(title, element("p", "hero-description", t.description));
  const notice = element("p", "notice", t.notice);
  const spaces = element("section", "section");
  spaces.id = "spaces";
  const heading = element("div", "section-heading");
  heading.append(
    element("p", "eyebrow", "01 / PROJECTS"),
    element("h2", "", t.recent),
  );
  const intro = element("div", "section-intro");
  intro.append(
    element(
      "p",
      "",
      locale === "en" ? site.projectsIntro : site.projectsIntroKo,
    ),
  );
  heading.append(intro);
  const all = element("a", "text-link section-link", `${t.all} ↗`);
  all.href = "https://www.rieuldorang.com/projects-rieuldorang";
  spaces.append(
    heading,
    buildingList(
      buildings.map((item) => ({
        ...item,
        name: t.projectNames[item.id] ?? item.name,
        summary: "",
        image: item.image
          ? {
              ...item.image,
              alt: `${t.projectNames[item.id] ?? item.name} ${locale === "ko" ? "건축 사진" : "architecture photograph"}`,
            }
          : undefined,
        category:
          locale === "ko"
            ? item.category.replace("PROJECT", "프로젝트")
            : item.category,
      })),
      t.projectLink,
    ),
    all,
  );
  const about = element("section", "section about");
  about.id = "about";
  for (const item of introductions) {
    if (item.image) {
      const image = element("img", "portrait");
      image.src = import.meta.env.BASE_URL + item.image.src.replace(/^\//, '');
      image.alt =
        locale === "ko"
          ? item.image.alt
          : item.id === "principal"
            ? "Portrait of principal architect Kim, Seongyoul"
            : item.title;
      image.loading = "lazy";
      about.append(image);
    }
    const article = element("article");
    article.id = item.id;
    article.append(
      element("p", "eyebrow", "02 / PRINCIPAL"),
      element("h2", "", item.title),
    );
    article.append(
      element("p", "", t.principal),
      element("p", "", t.principalText),
    );
    if (item.href) {
      const link = element("a", "text-link", `${t.aboutLink} ↗`);
      link.href = item.href;
      article.append(link);
    }
    about.append(article);
  }
  const journal = element("section", "section news");
  journal.id = "news";
  journal.append(
    element("p", "eyebrow", "03 / JOURNAL"),
    element("h2", "", t.news),
  );
  for (const item of news) {
    const link = element("a", "news-item");
    link.href = item.href;
    const image = element("img");
    image.src = import.meta.env.BASE_URL + item.image.src.replace(/^\//, '');
    image.alt =
      locale === "ko"
        ? item.image.alt
        : item.id === "principal"
          ? "Portrait of principal architect Kim, Seongyoul"
          : item.title;
    image.loading = "lazy";
    link.append(
      image,
      element("h3", "", t.newsNames[item.id] ?? item.title),
      element("span", "", `${t.more} ↗`),
    );
    journal.append(link);
  }
  main.append(hero, notice, spaces, about, journal);
  const footer = element("footer", "site-footer");
  footer.append(
    element("strong", "logo", site.name),
    element(
      "p",
      "",
      `© ${new Date().getFullYear()} Rieuldorang. All Rights Reserved.`,
    ),
  );
  app.append(skip, header, main, footer);
  disposeMotion = initializeMotion();
}
render();
