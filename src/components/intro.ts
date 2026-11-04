import { element } from "./dom";

/** 기존 홈페이지의 건축 사진 슬라이더와 세 개의 키워드. */
export function intro(locale: "ko" | "en"): HTMLElement {
  const section = element("section", "hero");
  const title = element("h1", "visually-hidden", "CREATIVE · DIFFERENT · TIMELESS");
  const viewport = element("div", "intro-viewport");
  const track = element("div", "intro-track");
  const sources = ["01.jpg", "02.jpg", "03.png", "04.jpg", "05.jpg", "06.jpg"];
  sources.forEach((source, index) => {
    const image = element("img", `intro-image intro-image-${index % 2 ? "wide" : "narrow"}`);
    image.src = `${import.meta.env.BASE_URL}images/intro/${source}`;
    image.alt = locale === "ko" ? `건축 작품 ${index + 1}` : `Architecture project ${index + 1}`;
    track.append(image);
  });
  const previous = element("button", "intro-arrow intro-previous", "‹");
  const next = element("button", "intro-arrow intro-next", "›");
  previous.type = next.type = "button";
  previous.setAttribute("aria-label", locale === "ko" ? "이전 사진" : "Previous images");
  next.setAttribute("aria-label", locale === "ko" ? "다음 사진" : "Next images");
  previous.addEventListener("click", () => viewport.scrollBy({ left: -viewport.clientWidth * .5, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }));
  next.addEventListener("click", () => viewport.scrollBy({ left: viewport.clientWidth * .5, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }));
  previous.hidden = true;
  viewport.addEventListener("scroll", () => {
    previous.hidden = viewport.scrollLeft < 2;
  }, { passive: true });
  viewport.append(track);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const timer = window.setInterval(() => {
    if (!section.isConnected) { window.clearInterval(timer); return; }
    if (reducedMotion.matches || document.hidden || viewport.matches(":hover") || viewport.contains(document.activeElement)) return;
    const end = viewport.scrollWidth - viewport.clientWidth;
    viewport.scrollTo({ left: viewport.scrollLeft >= end - 2 ? 0 : Math.min(end, viewport.scrollLeft + viewport.clientWidth * .25), behavior: "smooth" });
  }, 5000);
  const gallery = element("div", "intro-wrapper");
  gallery.append(viewport, previous, next);
  const captions = element("div", "intro-captions");
  ["CREATIVE", "DIFFERENT", "TIMELESS"].forEach((word) => captions.append(element("span", "", word)));
  section.append(title, gallery, captions);
  return section;
}
