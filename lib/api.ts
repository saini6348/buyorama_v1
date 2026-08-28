import { ApiBrand, ApiCard, ApiCoupon, ApiFeed, CardSettings } from "./types";

const API_URL = process.env.NEXT_PUBLIC_BUYORAMA_API_URL ?? "";
const API_KEY = process.env.BUYORAMA_API_KEY ?? "";

type Envelope<T> = { success: boolean; data: T; error?: { code: string; message: string } };

async function post<T>(path: string, body: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Buyorama-Key": API_KEY },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json: Envelope<T>;
  try {
    json = JSON.parse(text) as Envelope<T>;
  } catch {
    throw new Error(`API ${path} returned non-JSON (status ${res.status}): ${text.slice(0, 200)}`);
  }
  if (!json.success) {
    throw new Error(json.error?.message ?? `API error on ${path} (status ${res.status})`);
  }
  return json.data;
}

export const getBrands = (search?: string) => post<ApiBrand[]>("/brands", search ? { search } : {});
export const getBrandDetail = (slug: string) =>
  post<{ brand: ApiBrand; coupons: ApiCoupon[]; feeds: ApiFeed[] }>("/brands/detail", { slug });
export const getCoupons = (opts: { brand_slug?: string; featured?: boolean; limit?: number } = {}) =>
  post<ApiCoupon[]>("/coupons", opts);
export const getFeeds = (opts: { brand_slug?: string; limit?: number } = {}) => post<ApiFeed[]>("/feeds", opts);
export const getCards = (opts: { bank_slugs?: string[]; category_slugs?: string[]; tag_slugs?: string[]; limit?: number } = {}) =>
  post<ApiCard[]>("/cards", opts);
export const getCardSettings = () => post<CardSettings>("/card-settings", {});
