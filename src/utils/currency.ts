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
  currency?: Currency,
  conversionRate: number = 1
): number {
  if (!entries.length) return 0;

  return entries
    .filter((entry) => (!currency ? true : entry.currency === currency))
    .reduce((total, entry) => {
      const isDolar = entry.currency === "USD";
      const amount = isDolar ? entry.amount * conversionRate : entry.amount;
      return total + amount;
    }, 0);
}
