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
