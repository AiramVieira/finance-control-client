import type { Currency } from "../@types/currency";

const BASE_URL = process.env.VITE_CURRENCY_API;

export async function getExchangeRate(currency: Currency = "USD") {
  try {
    const response = await fetch(`${BASE_URL}/json/last/${currency}`);
    if (!response.ok) throw Error("Falha ao buscar a cotação atual");
    const { USDBRL } = await response.json();
    return +USDBRL.high;
  } catch (error: any) {
    console.error(error.message);
    return 1;
  }
}
