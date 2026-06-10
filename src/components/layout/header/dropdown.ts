export type DropdownController = {
  close: () => void;
};

export function bindDropdown(
  button: HTMLButtonElement | null,
  wrapper: HTMLElement | null,
  menu: HTMLElement | null,
  mobileBreakpoint = 1024,
  signal?: AbortSignal
): DropdownController | null {
  if (!button || !wrapper || !menu) return null;

  const safeButton = button;
  const safeWrapper = wrapper;
  const safeMenu = menu;

  const links = Array.from(
    safeMenu.querySelectorAll<HTMLAnchorElement>('a[href]')
  );

  const listenerOptions: AddEventListenerOptions | undefined = signal
    ? { signal }
    : undefined;

  const isMobileView = () => window.innerWidth <= mobileBreakpoint;

  function setOpenState(isOpen: boolean) {
    safeWrapper.classList.toggle("is-open", isOpen);
    safeButton.setAttribute("aria-expanded", String(isOpen));
  }

  function close() {
    setOpenState(false);
  }

  function open(focusFirstItem = false) {
    setOpenState(true);

    if (focusFirstItem) {
      window.requestAnimationFrame(() => {
        links[0]?.focus({ preventScroll: true });
      });
    }
  }

  function toggle() {
    setOpenState(!safeWrapper.classList.contains("is-open"));
  }

  function moveFocus(currentIndex: number, direction: 1 | -1) {
    if (!links.length) return;

    const nextIndex =
      (currentIndex + direction + links.length) % links.length;

    links[nextIndex]?.focus({ preventScroll: true });
  }

  setOpenState(false);

  safeButton.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggle();
    },
    listenerOptions
  );

  safeButton.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        open(true);
      }

      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    },
    listenerOptions
  );

  safeWrapper.addEventListener(
    "pointerenter",
    () => {
      if (!isMobileView()) {
        open();
      }
    },
    listenerOptions
  );

  safeWrapper.addEventListener(
    "pointerleave",
    () => {
      if (!isMobileView()) {
        close();
      }
    },
    listenerOptions
  );

  safeWrapper.addEventListener(
    "focusin",
    () => {
      if (!isMobileView()) {
        open();
      }
    },
    listenerOptions
  );

  safeWrapper.addEventListener(
    "focusout",
    (event) => {
      if (isMobileView()) return;

      const nextTarget = event.relatedTarget as Node | null;

      if (!nextTarget || !safeWrapper.contains(nextTarget)) {
        close();
      }
    },
    listenerOptions
  );

  links.forEach((link, index) => {
    link.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          moveFocus(index, 1);
        }

        if (event.key === "ArrowUp") {
          event.preventDefault();
          moveFocus(index, -1);
        }

        if (event.key === "Home") {
          event.preventDefault();
          links[0]?.focus({ preventScroll: true });
        }

        if (event.key === "End") {
          event.preventDefault();
          links[links.length - 1]?.focus({ preventScroll: true });
        }

        if (event.key === "Escape") {
          event.preventDefault();
          close();
          safeButton.focus({ preventScroll: true });
        }
      },
      listenerOptions
    );
  });

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as Node;

      if (!safeWrapper.contains(target)) {
        close();
      }
    },
    listenerOptions
  );

  window.addEventListener(
    "resize",
    () => {
      close();
    },
    listenerOptions
  );

  return { close };
}
