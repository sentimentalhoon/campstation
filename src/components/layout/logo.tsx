import Link from "next/link";
import { Tent } from "lucide-react";

export function Logo() {
    return (
        <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-md p-1">
                <Tent className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight">
                Campstation
            </span>
        </Link>
    );
}
