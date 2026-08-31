export function formatAED(n: number): string {
  return `AED ${Number.isFinite(n) ? n.toLocaleString("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}`;
}