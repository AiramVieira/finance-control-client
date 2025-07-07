import { memo } from "react";
import type { Currency } from "../@types/currency";
import type { Finance } from "../@types/finances";
import { formatCurrency, getTotalValueByCurrency } from "../utils/currency";

interface TotalCardProps {
  title: string;
  currency?: Currency;
  entries: Finance[];
  conversionRate?: number;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  textColor: string;
}

const TotalCard = memo<TotalCardProps>(({
  title,
  currency,
  entries,
  conversionRate,
  gradientFrom,
  gradientTo,
  borderColor,
  textColor
}) => {
  const totalValue = getTotalValueByCurrency(entries, currency, conversionRate);
  const formattedValue = formatCurrency(totalValue, currency || "BRL");

  return (
    <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-lg rounded-2xl p-6 border ${borderColor}`}>
      <h3 className="text-lg font-semibold text-white mb-2">
        {title}
      </h3>
      <p className={`text-3xl font-bold ${textColor}`}>
        {formattedValue}
      </p>
    </div>
  );
});

TotalCard.displayName = "TotalCard";

export default TotalCard; 