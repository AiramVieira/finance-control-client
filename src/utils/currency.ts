import type { Currency } from "../@types/currency";
import type { Finance } from "../@types/finances";

export function formatCurrency(amount: number, currency: Currency): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency === "BRL" ? "BRL" : "USD",
  }).format(amount);
}

export function getTotalValueByCurrency(
  entries: Finance[],
  currency: Currency
): number {
  if (!entries.length) return 0;
  return entries
    .filter((entry) => entry.currency === currency)
    .reduce((total, entry) => total + entry.amount, 0);
}
