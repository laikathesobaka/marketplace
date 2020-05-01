export function formatPrice(price) {
  if (price === 0) {
    return "0.00";
  }
  return String(price).slice(0, -2) + "." + String(price).slice(-2);
}
