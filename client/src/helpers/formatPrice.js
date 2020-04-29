export function formatPrice(price) {
  return String(price).slice(0, -2) + "." + String(price).slice(-2);
}
