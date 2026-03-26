export function bindDropdown(
  button: HTMLButtonElement | null,
  wrapper: HTMLElement | null,
  mobileBreakpoint = 1450
) {
  if (!button || !wrapper) return;

  const safeButton = button;
  const safeWrapper = wrapper;

  const isMobileView = () => window.innerWidth <= mobileBreakpoint;

  function setOpenState(isOpen: boolean) {
    safeWrapper.classList.toggle("is-open", isOpen);
    safeButton.setAttribute("aria-expanded", String(isOpen));
  }

  function toggleDropdown() {
    const isOpen = safeWrapper.classList.contains("is-open");
    setOpenState(!isOpen);
  }

  setOpenState(false);

  safeButton.addEventListener("click", (event) => {
    if (!isMobileView()) return;

    event.preventDefault();
    event.stopPropagation();
    toggleDropdown();
  });

  document.addEventListener("click", (event) => {
    if (!isMobileView()) return;

    const target = event.target as Node;
    if (!safeWrapper.contains(target)) {
      setOpenState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpenState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (!isMobileView()) {
      setOpenState(false);
    }
  });
}