export function clamp(value: number, from: number, to: number): number {
  return value < from
    ? from
    : value > to
      ? to
      : value;
}
