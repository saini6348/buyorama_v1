export type SettingRef = { name: string; slug: string };

export type ApiBrand = {
  name: string;
  slug: string;
  site_url: string;
  logo_url: string;
  coupon_count: number;
  feed_count: number;
};

export type ApiCoupon = {
  title: string;
  slug: string;
  description: string;
  link: string;
  featured: boolean;
  brand: { name: string; slug: string; logo_url: string } | null;
  added_at: string;
};

export type ApiFeed = {
  title: string;
  slug: string;
  description: string;
  image_url: string;
  brand: { name: string; slug: string } | null;
  added_at: string;
};

export type ApiCard = {
  title: string;
  slug: string;
  description: string;
  link: string;
  logo_url: string;
  banks: SettingRef[];
  categories: SettingRef[];
  tags: SettingRef[];
};

export type CardSettings = {
  tags: SettingRef[];
  categories: SettingRef[];
  banks: SettingRef[];
};

export type ApiSalesEvent = {
  title: string;
  slug: string;
  status: string;
  feed_count: number;
};

export type ApiSalesEventFeed = {
  title: string;
  slug: string;
  description: string;
  image_url: string;
  added_at: string;
};
