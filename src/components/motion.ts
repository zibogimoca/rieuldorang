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

  return () => observer.disconnect();
}
