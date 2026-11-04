/** 원본 메뉴의 포인터 거리 기반 확대 및 스프링 복귀 효과. */
export function initializeHeaderDock(nav: HTMLElement): () => void {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>(":scope > a"));
  const labels = links.map(link => link.querySelector<HTMLSpanElement>("span")!);
  const states = links.map(() => ({ x: 1, v: 0 }));
  let mouseX: number | null = null;
  let last = performance.now();
  let frame = 0;
  const move = (event: MouseEvent) => { mouseX = event.clientX; };
  const leave = () => { mouseX = null; };
  nav.addEventListener("mousemove", move);
  nav.addEventListener("mouseleave", leave);
  function tick(now: number): void {
    const dt = Math.min((now - last) / 1000, .05);
    last = now;
    links.forEach((link, index) => {
      const label = labels[index];
      const state = states[index];
      const rect = link.getBoundingClientRect();
      const distance = mouseX === null ? Infinity : Math.abs(mouseX - (rect.left + rect.width / 2));
      const target = 1 + .4 * Math.max(0, 1 - distance / 140);
      for (let h = dt; h > 0; h -= .004) {
        const step = Math.min(h, .004);
        state.v += ((-150 * (state.x - target) - 13 * state.v) / .1) * step;
        state.x += state.v * step;
      }
      if (Math.abs(state.x - target) < .0005 && Math.abs(state.v) < .005) { state.x = target; state.v = 0; }
      label.style.transform = `scale(${state.x.toFixed(4)})`;
      link.style.width = `${label.offsetWidth * state.x + 16}px`;
    });
    frame = requestAnimationFrame(tick);
  }
  frame = requestAnimationFrame(tick);
  return () => { cancelAnimationFrame(frame); nav.removeEventListener("mousemove", move); nav.removeEventListener("mouseleave", leave); };
}
