import Hero from "@/components/Hero";
import Trending from "@/components/sections/Trending";
import PopularStores from "@/components/sections/PopularStores";
import LatestCoupons from "@/components/sections/LatestCoupons";
import CardOffers from "@/components/sections/CardOffers";
import RequestDeals from "@/components/sections/RequestDeals";
import { getBrands, getCards, getCoupons } from "@/lib/api";
import { ApiBrand, ApiCard, ApiCoupon } from "@/lib/types";

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

  return (
    <>
      <Hero brands={brands} />
      <Trending coupons={featured.filter((c) => c.featured)} />
      <PopularStores brands={brands} />
      <LatestCoupons coupons={latest.slice(0, 6)} />
      <CardOffers cards={cards} />
      <RequestDeals />
    </>
  );
}
