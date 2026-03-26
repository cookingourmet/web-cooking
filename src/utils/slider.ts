export function nextIndex(current: number, total: number) {
  return (current + 1) % total;
}

export function prevIndex(current: number, total: number) {
  return (current - 1 + total) % total;
}