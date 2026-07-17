/** Format catalogue prices in Zambian Kwacha (e.g. K400). */
export function formatPrice(amount: number): string {
  return `K${amount}`;
}
