import Link from "next/link";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { Prisma } from "@prisma/client";

// Define a type that includes the _count property from the query
type CampsiteWithCount = Prisma.CampsiteGetPayload<{
    include: { _count: { select: { reviews: true } } };
}>;

interface CampsiteCardProps {
    campsite: CampsiteWithCount;
}

export function CampsiteCard({ campsite }: CampsiteCardProps) {
    return (
        <Link href={`/campsites/${campsite.id}`} className="group block h-full">
            <div className="flex flex-col h-full overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    {campsite.images[0] ? (
                        <Image
                            src={campsite.images[0]}
                            alt={campsite.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                            No Image
                        </div>
                    )}
                    <div className="absolute top-2 right-2 rounded-full bg-background/80 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm">
                        ₩{campsite.price.toLocaleString()} / 박
                    </div>
                </div>

                <div className="flex flex-col flex-1 p-4 space-y-2">
                    <div className="flex items-start justify-between">
                        <h3 className="font-semibold tracking-tight text-lg line-clamp-1 group-hover:text-primary transition-colors">
                            {campsite.name}
                        </h3>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-3.5 w-3.5" />
                        <span className="line-clamp-1">{campsite.location}</span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                        {campsite.description}
                    </p>

                    <div className="mt-auto pt-4 flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="font-medium">4.8</span>
                            <span className="text-muted-foreground">({campsite._count.reviews})</span>
                        </div>
                        <div className="flex gap-1 flex-wrap justify-end">
                            {campsite.facilities.slice(0, 2).map((facility) => (
                                <span key={facility} className="px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground text-xs">
                                    {facility}
                                </span>
                            ))}
                            {campsite.facilities.length > 2 && (
                                <span className="px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground text-xs">
                                    +{campsite.facilities.length - 2}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
