import { getCampsites } from "@/lib/actions/campsite-actions";
import { HeroSearch } from "@/components/home/hero-search";
import { CategoryGrid } from "@/components/home/category-grid";
import { PromoBanner } from "@/components/home/promo-banner";
import { CampsiteCard } from "@/components/campsite/campsite-card";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function Home() {
  const { data: campsites } = await getCampsites();

  // Simulate "Popular" vs "New" by slicing differently for now
  const popularCampsites = campsites?.slice(0, 4);
  const newCampsites = campsites?.slice(2, 6);

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      {/* 1. Hero Search Section */}
      <HeroSearch />

      <div className="container mx-auto px-4 space-y-12">
        {/* 2. Category Navigation */}
        <section className="-mt-6 relative z-10 bg-background rounded-2xl p-4 shadow-sm border">
          <CategoryGrid />
        </section>

        {/* 3. Promo Banner */}
        <section>
          <PromoBanner />
        </section>

        {/* 4. Popular Campsites */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold font-heading">🔥 실시간 인기 캠핑장</h2>
            <Link href="/campsites" className="text-sm text-muted-foreground hover:text-primary flex items-center">
              전체보기 <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCampsites?.map((site) => (
              <CampsiteCard key={site.id} campsite={site} />
            ))}
          </div>
        </section>

        {/* 5. New Open Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-heading">✨ 새로 오픈했어요</h2>
              <p className="text-sm text-muted-foreground">깨끗한 시설, 쾌적한 환경을 먼저 경험해보세요.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newCampsites?.map((site) => (
              <CampsiteCard key={site.id} campsite={site} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
