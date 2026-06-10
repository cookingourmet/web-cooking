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

  const links = Array.from(
    menu.querySelectorAll<HTMLAnchorElement>('a[href]')
  );

  const listenerOptions = signal ? { signal } : undefined;
  const isMobileView = () => window.innerWidth <= mobileBreakpoint;

  function setOpenState(isOpen: boolean) {
    wrapper.classList.toggle("is-open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
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
    setOpenState(!wrapper.classList.contains("is-open"));
  }

  function moveFocus(currentIndex: number, direction: 1 | -1) {
    if (!links.length) return;

    const nextIndex =
      (currentIndex + direction + links.length) % links.length;

    links[nextIndex]?.focus({ preventScroll: true });
  }

  setOpenState(false);

  button.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggle();
    },
    listenerOptions
  );

  button.addEventListener(
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

  wrapper.addEventListener(
    "pointerenter",
    () => {
      if (!isMobileView()) {
        open();
      }
    },
    listenerOptions
  );

  wrapper.addEventListener(
    "pointerleave",
    () => {
      if (!isMobileView()) {
        close();
      }
    },
    listenerOptions
  );

  wrapper.addEventListener(
    "focusin",
    () => {
      if (!isMobileView()) {
        open();
      }
    },
    listenerOptions
  );

  wrapper.addEventListener(
    "focusout",
    (event) => {
      if (isMobileView()) return;

      const nextTarget = event.relatedTarget as Node | null;

      if (!nextTarget || !wrapper.contains(nextTarget)) {
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
          links.at(-1)?.focus({ preventScroll: true });
        }

        if (event.key === "Escape") {
          event.preventDefault();
          close();
          button.focus({ preventScroll: true });
        }
      },
      listenerOptions
    );
  });

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as Node;

      if (!wrapper.contains(target)) {
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
