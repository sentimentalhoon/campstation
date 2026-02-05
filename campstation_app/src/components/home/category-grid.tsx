import Link from "next/link";
import { Tent, Car, Home, Trees, Waves, Mountain } from "lucide-react";

const categories = [
    { icon: Tent, label: "오토캠핑", color: "bg-orange-100 text-orange-600" },
    { icon: Home, label: "글램핑", color: "bg-blue-100 text-blue-600" },
    { icon: Car, label: "카라반", color: "bg-green-100 text-green-600" },
    { icon: Trees, label: "펜션", color: "bg-emerald-100 text-emerald-600" },
    { icon: Waves, label: "풀빌라", color: "bg-cyan-100 text-cyan-600" },
    { icon: Mountain, label: "차박", color: "bg-indigo-100 text-indigo-600" },
];

export function CategoryGrid() {
    return (
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 py-8">
            {categories.map((category) => (
                <Link
                    key={category.label}
                    href={`/campsites?category=${category.label}`}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                    <div className={`p-4 rounded-2xl ${category.color} transition-transform group-hover:scale-110 shadow-sm`}>
                        <category.icon className="h-6 w-6 md:h-8 md:w-8" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {category.label}
                    </span>
                </Link>
            ))}
        </div>
    );
}
