import type { Finance } from "../@types/finances";

const BASE_URL = process.env.VITE_BASE_URL;

export async function fetchFinances(secretKey: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/finances/${secretKey}`);
    const record = await response.json();
    if (!record.success) throw new Error(record.message);
    return record.finance;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function addFinance(finance: Finance) {
  const response = await fetch("${BASE_URL}/api/finances/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finance),
  });
  return await response.json();
}

export async function deleteFinance(id: string) {
  const response = await fetch(`${BASE_URL}/api/finances/remove/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}
