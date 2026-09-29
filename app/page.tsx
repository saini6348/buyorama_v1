import Hero from "@/components/Hero";
import Trending from "@/components/sections/Trending";
import StoreFeedSpotlight from "@/components/sections/StoreFeedSpotlight";
import PopularStores from "@/components/sections/PopularStores";
import LatestCoupons from "@/components/sections/LatestCoupons";
import CardOffers from "@/components/sections/CardOffers";
import RequestDeals from "@/components/sections/RequestDeals";
import { getBrands, getCards, getCoupons, getFeeds } from "@/lib/api";
import { ApiBrand, ApiCard, ApiCoupon, ApiFeed } from "@/lib/types";

export const revalidate = 60;

export default async function HomePage() {
  let brands: ApiBrand[] = [];
  let featured: ApiCoupon[] = [];
  let latest: ApiCoupon[] = [];
  let cards: ApiCard[] = [];
  try {
    [brands, featured, latest, cards] = await Promise.all([
      getBrands(),
      getCoupons({ featured: true, limit: 3 }),
      getCoupons({ limit: 6 }),
      getCards({ limit: 4 }),
    ]);
  } catch {
    // API unreachable (e.g. build without env vars) — render empty sections.
  }

  const spotlightBrands = brands.slice(0, 6);
  const feedsByBrand: Record<string, ApiFeed[]> = {};
  try {
    const feedLists = await Promise.all(spotlightBrands.map((b) => getFeeds({ brand_slug: b.slug, limit: 2 })));
    spotlightBrands.forEach((b, i) => {
      feedsByBrand[b.slug] = feedLists[i];
    });
  } catch {
    // ignore — spotlight falls back to an empty state per store
  }

  return (
    <>
      <Hero brands={brands} />
      <Trending coupons={featured.filter((c) => c.featured)} />
      <StoreFeedSpotlight brands={spotlightBrands} feedsByBrand={feedsByBrand} />
      <PopularStores brands={brands} />
      <LatestCoupons coupons={latest.slice(0, 6)} />
      <CardOffers cards={cards} />
      <RequestDeals />
    </>
  );
}
