export function renderButton(label: string, href = "#", variant = "primary") {
  return `<a href="${href}" class="ui-btn ui-btn--${variant}">${label}</a>`;
}