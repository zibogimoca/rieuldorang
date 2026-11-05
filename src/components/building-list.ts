import type { Building } from "../types/content";
import { element } from "./dom";

export function buildingList(
  items: Building[],
  linkLabel: string,
): HTMLElement {
  const grid = element("div", "building-grid");
  for (const [index, building] of items
    .filter((item) => item.published)
    .entries()) {
    const card = element("article", "building-card");
    const visual = element(
      building.href ? "a" : "div",
      `building-visual visual-${index % 2}`,
    );
    if (visual instanceof HTMLAnchorElement && building.href) {
      visual.href = building.href;
      visual.setAttribute("aria-label", `${building.name} — ${linkLabel}`);
    }
    if (building.image) {
      const image = element("img");
      image.src =
        import.meta.env.BASE_URL + building.image.src.replace(/^\//, "");
      image.alt = building.image.alt;
      image.loading = "lazy";
      visual.append(image);
      if (building.href) {
        const caption = element("span", "building-caption");
        caption.append(element("span", "", building.name), element("span", "", `${linkLabel} ›`));
        visual.append(caption);
      }
    } else {
      visual.setAttribute("aria-hidden", "true");
      visual.append(element("span", "architectural-form"));
    }
    card.append(
      visual,
      element("p", "eyebrow", building.category),
      element("h3", "", building.name),
      element("p", "summary", building.summary),
    );
    const details = element("details", "building-details");
    details.append(
      element("summary", "", "공간 이야기 읽기"),
      element("p", "", building.description),
    );
    if (building.href) {
      const link = element("a", "text-link", `${linkLabel} ↗`);
      link.href = building.href;
      link.setAttribute("aria-label", `${building.name} — ${linkLabel}`);
      card.append(link);
    } else card.append(details);
    card.classList.toggle("building-card-featured", index === 0);
    grid.append(card);
  }
  if (!grid.childElementCount)
    grid.append(element("p", "", "새로운 공간 이야기를 준비하고 있습니다."));
  return grid;
}
