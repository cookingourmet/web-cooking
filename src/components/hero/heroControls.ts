type BindSliderControlsParams = {
  root: HTMLElement;
  progressItems: HTMLButtonElement[];
  prev: HTMLButtonElement | null;
  next: HTMLButtonElement | null;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
};

export function bindSliderControls({
  root,
  progressItems,
  prev,
  next,
  onSelect,
  onPrev,
  onNext,
  onReset,
}: BindSliderControlsParams) {
  const cleanups: Array<() => void> = [];

  progressItems.forEach((item, index) => {
    const handleClick = () => {
      onSelect(index);
      onReset();
    };

    item.addEventListener("click", handleClick);
    cleanups.push(() => item.removeEventListener("click", handleClick));
  });

  if (prev) {
    const handlePrev = () => {
      onPrev();
      onReset();
    };

    prev.addEventListener("click", handlePrev);
    cleanups.push(() => prev.removeEventListener("click", handlePrev));
  }

  if (next) {
    const handleNext = () => {
      onNext();
      onReset();
    };

    next.addEventListener("click", handleNext);
    cleanups.push(() => next.removeEventListener("click", handleNext));
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onPrev();
      onReset();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      onNext();
      onReset();
    }
  };

  root.addEventListener("keydown", handleKeydown);
  cleanups.push(() => root.removeEventListener("keydown", handleKeydown));

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
