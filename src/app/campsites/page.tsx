import { getCampsites } from "@/lib/actions/campsite-actions";
import { CampsiteCard } from "@/components/campsite/campsite-card";

export default async function CampsitesPage() {
    const { data: campsites, error } = await getCampsites();

    if (error) {
        return (
            <div className="container py-20 text-center">
                <h2 className="text-2xl font-bold text-destructive">오류가 발생했습니다</h2>
                <p className="text-muted-foreground">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-muted/30 min-h-screen">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="mb-8 space-y-2">
                    <h1 className="text-3xl font-bold font-heading tracking-tight sm:text-4xl">
                        캠핑장 둘러보기
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        자연 속에서의 특별한 경험, 마음에 드는 곳을 찾아보세요.
                    </p>
                </div>

                {/* Filters Placeholder - To be implemented later */}

                {campsites && campsites.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {campsites.map((campsite) => (
                            <CampsiteCard key={campsite.id} campsite={campsite} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <p className="text-lg text-muted-foreground">등록된 캠핑장이 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
