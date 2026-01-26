import { Utils } from "lucide-react"; // Keeping existing? No, just adding the import.
import { BookingForm } from "@/components/booking/booking-form";
import { MapPin, Star, User, Calendar, Share2, Heart, Wifi, Car, Utensils, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

// Map facilities to icons
const getFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
        case "wifi": return <Wifi className="h-4 w-4" />;
        case "주차장": return <Car className="h-4 w-4" />;
        case "바베큐": return <Utensils className="h-4 w-4" />;
        case "에어컨": return <Wind className="h-4 w-4" />;
        default: return <Star className="h-4 w-4" />;
    }
};

export default async function CampsiteDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const { data: campsite, error } = await getCampsiteById(id);

    if (error || !campsite) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* 1. Image Gallery (Grid) */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                    {campsite.images.map((image: string, index: number) => (
                        <div
                            key={index}
                            className={cn(
                                "relative bg-muted",
                                index === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1",
                                "hidden md:block", // Hide smaller images on mobile initially for simplicity, or show via carousel in real app
                                index === 0 && "block" // Always show main image
                            )}
                        >
                            <Image
                                src={image}
                                alt={`${campsite.name} - ${index + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                    {/* Mobile Single Image fallback if grid logic is complex for 2 images, but flex handles it */}
                </div>
            </div>

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* 2. Main Content */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Header Info */}
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold font-heading">{campsite.name}</h1>
                        <div className="flex items-center text-muted-foreground gap-4 text-sm">
                            <div className="flex items-center">
                                <MapPin className="mr-1 h-4 w-4" />
                                {campsite.location}
                            </div>
                            <div className="flex items-center">
                                <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                                <span className="font-medium text-foreground">4.8</span>
                                <span className="ml-1">(후기 {campsite.reviews.length}개)</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-border" />

                    {/* Host Info */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                                {campsite.owner.image ? (
                                    <Image src={campsite.owner.image} alt={campsite.owner.name || "Host"} fill className="object-cover" />
                                ) : (
                                    <User className="h-full w-full p-2 text-muted-foreground" />
                                )}
                            </div>
                            <div>
                                <p className="font-semibold">호스트: {campsite.owner.name}님</p>
                                <p className="text-sm text-muted-foreground">슈퍼호스트 · 빠른 응답</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-border" />

                    {/* Facilities */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">편의 시설</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {campsite.facilities.map((facility: string) => (
                                <div key={facility} className="flex items-center gap-2 p-3 rounded-lg border bg-card/50">
                                    {getFacilityIcon(facility)}
                                    <span className="text-sm">{facility}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-border" />

                    {/* Description */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">숙소 소개</h3>
                        <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
                            {campsite.description}
                        </p>
                    </div>

                    <div className="h-px bg-border" />

                    {/* Reviews Preview */}
                    <div className="space-y-6">
                        <h3 className="font-semibold text-lg">후기 {campsite.reviews.length}개</h3>
                        <div className="space-y-4">
                            {campsite.reviews.map((review: any) => (
                                <div key={review.id} className="p-4 rounded-xl bg-muted/30 space-y-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="relative h-8 w-8 rounded-full overflow-hidden bg-muted">
                                            {review.user.image && <Image src={review.user.image} alt="User" fill />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{review.user.name}</p>
                                            <p className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex text-primary">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={cn("h-3 w-3", i < review.rating ? "fill-primary" : "text-muted-foreground opacity-30")} />
                                        ))}
                                    </div>
                                    <p className="text-sm">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Booking Sidebar (Sticky) */}
                <div className="relative">
                    <div className="sticky top-24 p-6 rounded-2xl border bg-card shadow-lg space-y-6">
                        <div className="flex items-baseline justify-between">
                            <span className="text-2xl font-bold">₩{campsite.price.toLocaleString()}</span>
                            <span className="text-muted-foreground">/ 박</span>
                        </div>

                        <BookingForm campsiteId={campsite.id} pricePerNight={campsite.price} />
                    </div>
                </div>
            </div>
        </div>
    );
}
