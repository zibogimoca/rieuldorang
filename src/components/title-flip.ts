/** 원본 제목의 글자별 3D 회전 효과. 접근성용 원문은 한 번만 노출합니다. */
export function initializeTitleFlip(): void {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const selectors = [
    "#spaces .section-heading h2",
    "#news .home-news-feature h2",
    ".original-news > h1",
    ".original-news-book h2",
    ".original-awards h2",
  ];
  document
    .querySelectorAll<HTMLElement>(selectors.join(", "))
    .forEach((heading) => {
      const text = heading.textContent || "";
      const accessible = document.createElement("span");
      accessible.className = "title-flip-sr";
      accessible.textContent = text;
      const visible = document.createElement("span");
      visible.setAttribute("aria-hidden", "true");
      text.split(/(\s+)/).forEach((word) => {
        if (!word) return;
        if (/^\s+$/.test(word)) {
          visible.append(document.createTextNode(word));
          return;
        }
        const group = document.createElement("span");
        group.className = "title-flip-word";
        Array.from(word).forEach((character) => {
          const cell = document.createElement("span");
          cell.className = "title-flip-cell";
          const front = document.createElement("span");
          const bottom = document.createElement("span");
          front.textContent = bottom.textContent = character;
          cell.append(front, bottom);
          group.append(cell);
        });
        visible.append(group);
      });
      heading.replaceChildren(accessible, visible);
      let busy = false;
      heading.addEventListener("mouseenter", () => {
        if (busy || still.matches) return;
        busy = true;
        const animations = Array.from(
          heading.querySelectorAll<HTMLElement>(".title-flip-cell"),
        ).map((cell, index) =>
          cell.animate(
            [{ transform: "rotateX(0deg)" }, { transform: "rotateX(90deg)" }],
            {
              duration: 550,
              delay: index * 30,
              easing: "cubic-bezier(.25, 1, .5, 1)",
            },
          ),
        );
        Promise.all(animations.map((animation) => animation.finished))
          .catch(() => {})
          .then(() => {
            busy = false;
          });
      });
    });
}
