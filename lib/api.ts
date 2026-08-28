import { ApiBrand, ApiCard, ApiCoupon, ApiFeed, CardSettings } from "./types";

const API_URL = process.env.BUYORAMA_API_URL ?? "";
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

/* ---------------- display helpers (until every brand has a logo uploaded) ---------------- */

const ACCENTS = ["#ff9900", "#2874f0", "#ff3f6c", "#2c4152", "#f43397", "#00b9f1", "#b6ff3d", "#ff2e88", "#22e6ff"];

export function brandAccent(slug: string): string {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return ACCENTS[h % ACCENTS.length];
}

const GLYPHS: [RegExp, string][] = [
  [/amazon/i, "🛒"],
  [/flipkart/i, "📦"],
  [/myntra/i, "👕"],
  [/ajio/i, "🧥"],
  [/meesho/i, "🛍️"],
  [/mall|bajaj/i, "🏬"],
  [/nykaa/i, "💄"],
  [/tata|bigbasket/i, "🧺"],
  [/dominos|swiggy|zomato|food/i, "🍕"],
  [/bookmyshow|movie/i, "🎬"],
  [/uber|ola|travel/i, "🚗"],
];

export function brandGlyph(name: string): string {
  for (const [re, glyph] of GLYPHS) if (re.test(name)) return glyph;
  return "🏬";
}

export function timeAgo(dt: string): string {
  const then = new Date(dt.replace(" ", "T")).getTime();
  if (Number.isNaN(then)) return "just now";
  const mins = Math.max(0, Math.round((Date.now() - then) / 60000));
  if (mins < 60) return `${mins || 1}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}
