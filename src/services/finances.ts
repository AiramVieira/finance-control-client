import type { Finance } from "../@types/finances";

const BASE_URL = process.env.VITE_BASE_URL;

export async function fetchFinances(secretKey: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/finances/${secretKey}`);
    const { success, message, finance } = await response.json();
    if (!success) throw new Error(message);
    return finance;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function addFinance(_finance: Finance) {
  const response = await fetch(`${BASE_URL}/api/finances/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(_finance),
  });
  const { success, message, finance } = await response.json();
  if (!success) throw new Error(message);
  return finance;
}

export async function deleteFinance(id: string) {
  const response = await fetch(`${BASE_URL}/api/finances/remove/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}
