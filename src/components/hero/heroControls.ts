export function bindSliderControls(params: {
  dots: HTMLButtonElement[];
  prev: HTMLButtonElement | null;
  next: HTMLButtonElement | null;
  progressItems: HTMLButtonElement[];
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
}) {
  const { dots, prev, next, progressItems, onSelect, onPrev, onNext, onReset } = params;

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      onSelect(index);
      onReset();
    });
  });

  progressItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      onSelect(index);
      onReset();
    });
  });

  prev?.addEventListener("click", () => {
    onPrev();
    onReset();
  });

  next?.addEventListener("click", () => {
    onNext();
    onReset();
  });
}