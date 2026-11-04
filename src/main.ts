import "./styles/main.css";
import "./styles/motion.css";
import { initializeMotion } from "./components/motion";
import { buildings } from "./content/buildings";
import { introductions } from "./content/about";
import { news } from "./content/news";
import { site } from "./content/site";
import { buildingList } from "./components/building-list";
import { element } from "./components/dom";
import { intro as createIntro } from "./components/intro";
import { originalPage, originalPages, pageUrl } from "./components/page";
import { footer as createFooter } from "./components/footer";
import { initializeHeaderDock } from "./components/header-dock";

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
  const logo = element("a", "logo");
  logo.href = pageUrl("");
  logo.setAttribute(
    "aria-label",
    `${site.name} — ${locale === "ko" ? "홈" : "Home"}`,
  );
  const logoImage = element("img", "logo-image");
  logoImage.src = `${import.meta.env.BASE_URL}images/logo.png`;
  logoImage.alt = "";
  logo.append(logoImage);
  const nav = element("nav");
  nav.setAttribute("aria-label", t.menu);
  for (const [text, href] of [
    [t.projects, pageUrl("projects-rieuldorang")],
    [t.news, pageUrl("news")],
    [t.contact, pageUrl("contact")],
  ]) {
    const link = element("a");
    link.append(element("span", "", text));
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
  const disposeDock = initializeHeaderDock(nav);
  const slug = location.pathname
    .replace(import.meta.env.BASE_URL, "")
    .replace(/^\/+|\/+$/g, "");
  if (slug && originalPages[slug]) {
    const page = originalPage(slug, locale)!;
    app.append(skip, header, page, createFooter(locale));
    disposeMotion = disposeDock;
    return;
  }
  const main = element("main");
  main.id = "main";
  // 원본 순서: 메인 문구 → 최근 프로젝트 → 대표 소개 → 뉴스.
  const hero = createIntro(locale);
  const spaces = element("section", "section");
  spaces.id = "spaces";
  const heading = element("div", "section-heading");
  heading.append(element("h2", "", "Recent Projects"));
  const intro = element("div", "section-intro");
  intro.append(
    element("p", "", site.projectsIntro),
    element("p", "", site.projectsIntroKo),
  );
  heading.append(intro);
  const all = element("a", "text-link section-link", `${t.all} ↗`);
  all.href = pageUrl("projects-rieuldorang");
  spaces.append(
    heading,
    buildingList(
      buildings.map((item) => ({
        ...item,
        href: pageUrl(item.id),
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
      image.src = import.meta.env.BASE_URL + item.image.src.replace(/^\//, "");
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
      link.href = pageUrl("about-us");
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
    link.href = pageUrl(
      item.href.endsWith("/stay-collection") ? "stay-collection" : "news",
    );
    if (item.image) {
      const image = element("img");
      image.src = import.meta.env.BASE_URL + item.image.src.replace(/^\//, "");
      image.alt = item.image.alt;
      image.loading = "lazy";
      link.append(image);
    }
    const content = element("div", "news-content");
    content.append(element("h3", "", t.newsNames[item.id] ?? item.title));
    if (item.body) content.append(element("p", "", item.body[locale]));
    link.append(content, element("span", "", `${t.more} ↗`));
    journal.append(link);
  }
  main.append(hero, spaces, about, journal);
  app.append(skip, header, main, createFooter(locale));
  const disposePageMotion = initializeMotion();
  disposeMotion = () => { disposePageMotion(); disposeDock(); };
}
render();
