export function restartProgressAnimation(item: HTMLButtonElement) {
  const fill = item.querySelector<HTMLElement>(".hero-progress__fill");
  if (!fill) return;

  fill.style.animation = "none";
  void fill.offsetHeight;
  fill.style.animation = "";
}