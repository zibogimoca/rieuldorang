/** 모션은 화면·콘텐츠와 분리합니다. 언어 전환 시 이전 리스너를 정리합니다. */
export function initializeMotion(): () => void {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (preference.matches) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.08 },
  );
  document
    .querySelectorAll<HTMLElement>(
      ".section-heading, .building-card, .about, .news > h2, .news-item",
    )
    .forEach((target) => {
      target.classList.add("reveal");
      observer.observe(target);
    });

  const progress = document.createElement("div");
  progress.className = "reading-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.append(progress);
  let frame = 0;
  const update = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const range = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${range > 0 ? scrollY / range : 0})`;
    });
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();

  const cursor = document.createElement("div");
  cursor.className = "project-cursor";
  cursor.textContent = "↗";
  cursor.setAttribute("aria-hidden", "true");
  document.body.append(cursor);
  const follow = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    const target = event.target;
    const active =
      target instanceof Element && !!target.closest(".building-card");
    cursor.classList.toggle("is-active", active);
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  };
  const hide = () => cursor.classList.remove("is-active");
  document.addEventListener("pointermove", follow, { passive: true });
  document.addEventListener("pointerleave", hide);
  const reduce = () => {
    if (preference.matches) {
      document
        .querySelectorAll(".reveal")
        .forEach((node) => node.classList.add("is-visible"));
      hide();
    }
  };
  preference.addEventListener("change", reduce);
  return () => {
    observer.disconnect();
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
    document.removeEventListener("pointermove", follow);
    document.removeEventListener("pointerleave", hide);
    preference.removeEventListener("change", reduce);
    progress.remove();
    cursor.remove();
  };
}
