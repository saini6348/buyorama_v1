import Hero from "@/components/Hero";
import Trending from "@/components/sections/Trending";
import PopularStores from "@/components/sections/PopularStores";
import LatestCoupons from "@/components/sections/LatestCoupons";
import CardOffers from "@/components/sections/CardOffers";
import Newsletter from "@/components/sections/Newsletter";
import { getBrands, getCards, getCoupons } from "@/lib/api";

export const revalidate = 60;

export default async function HomePage() {
  const [brands, featured, latest, cards] = await Promise.all([
    getBrands(),
    getCoupons({ featured: true, limit: 3 }),
    getCoupons({ limit: 6 }),
    getCards({ limit: 4 }),
  ]);

  return (
    <>
      <Hero brands={brands} />
      <Trending coupons={featured.length ? featured : latest.slice(0, 3)} />
      <PopularStores brands={brands} />
      <LatestCoupons coupons={latest.slice(0, 6)} />
      <CardOffers cards={cards} />
      <Newsletter />
    </>
  );
}
