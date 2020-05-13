export function formatPrice(price) {
  if (price === 0) {
    return "0.00";
  }
  if (price < 10) {
    return "0.0" + String(price);
  }
  if (price < 100) {
    return "0." + String(price);
  }
  return String(price).slice(0, -2) + "." + String(price).slice(-2);
}
