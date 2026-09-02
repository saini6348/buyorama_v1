import { ApiBrand, ApiCard, ApiCoupon, ApiFeed, ApiSalesEvent, ApiSalesEventFeed, CardSettings } from "./types";
// NEXT_PUBLIC_BUYORAMA_API_URL is the WordPress install root (e.g. http://localhost/buyorama).
// The Buyorama plugin exposes its endpoints under /wp-json/api/v1.
const API_URL = process.env.NEXT_PUBLIC_BUYORAMA_API_URL ?? "";
const API_BASE = "/wp-json/api/v1";
const API_KEY = process.env.BUYORAMA_API_KEY ?? "";
type Envelope<T> = { success: boolean; data: T; error?: { code: string; message: string } };
async function post<T>(path: string, body: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(`${API_URL}${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Buyorama-Key": API_KEY },
    body: JSON.stringify(body),
    // Fail fast instead of hanging — a stalled request here can otherwise stall
    // the whole `next build` static-generation step until it times out at 60s.
    signal: AbortSignal.timeout(8000),
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
export const getSalesEvents = () => post<ApiSalesEvent[]>("/sales-events", {});
export const getSalesEventDetail = (slug: string) =>
  post<{ event: ApiSalesEvent; feeds: ApiSalesEventFeed[] }>("/sales-events/detail", { slug });
