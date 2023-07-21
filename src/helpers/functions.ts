export function minutesBefore(minutes: number) {
  const shift = minutes * 60 * 1_000;
  return new Date(Date.now() - shift);
}
