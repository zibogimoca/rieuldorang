import { element } from "./dom";
import { pageUrl } from "./page";
import type { Locale } from "../content/translations";

/** 원본의 저작권과 프로젝트·뉴스·문의 링크. */
export function footer(locale: Locale): HTMLElement {
  const section = element("footer", "site-footer");
  const identity = element("div", "footer-identity");
  identity.append(element("strong", "logo", "Rieuldorang"), element("p", "", `© ${new Date().getFullYear()} Rieuldorang. All Rights Reserved.`));
  const nav = element("nav", "footer-nav");
  nav.setAttribute("aria-label", locale === "ko" ? "하단 메뉴" : "Footer navigation");
  for (const [label, slug] of [["Projects", "projects-rieuldorang"], ["News", "news"], ["Contact", "contact"]]) {
    const link = element("a", "", label);
    link.href = pageUrl(slug);
    nav.append(link);
  }
  section.append(identity, nav);
  return section;
}
