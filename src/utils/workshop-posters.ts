/**
 * Flyers 1:1: deja tu imagen WEBP en public/images/talleres/cuadrados/<slug>.webp.
 * Si no existe, se conserva la imagen anterior; no hay que tocar los datos.
 */
export function initWorkshopPosters() {
  document.querySelectorAll<HTMLImageElement>("img[data-workshop-square]").forEach((img) => {
    const slug = img.dataset.workshopSquare;
    if (!slug || !/^[a-z0-9-]+$/.test(slug) || img.dataset.squareChecked === "1") return;
    img.dataset.squareChecked = "1";
    const candidate = `/images/talleres/cuadrados/${slug}.webp`;
    const preload = new Image();
    preload.onload = () => {
      if (!img.isConnected) return;
      img.src = candidate;
      img.width = 1080;
      img.height = 1080;
      img.classList.add("is-square-poster");
    };
    // En ausencia del cuadrado, se mantiene la imagen ya publicada.
    preload.onerror = () => {};
    preload.src = candidate;
  });
}
