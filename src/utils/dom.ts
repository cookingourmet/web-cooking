export function qs<T extends Element>(selector: string, parent: ParentNode = document) {
  return parent.querySelector<T>(selector);
}

export function qsa<T extends Element>(selector: string, parent: ParentNode = document) {
  return Array.from(parent.querySelectorAll<T>(selector));
}