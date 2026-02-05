import { getUserBookings } from "@/lib/actions/booking-actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, CreditCard } from "lucide-react";
import { format } from "date-fns";

export default async function BookingsPage() {
    const session = await auth();
    if (!session) redirect("/login");

    const { data: bookings, error } = await getUserBookings();

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <h1 className="text-3xl font-bold font-heading mb-8">내 예약 확인</h1>

            {bookings && bookings.length > 0 ? (
                <div className="grid gap-6">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="flex flex-col md:flex-row border rounded-xl overflow-hidden bg-card hover:shadow-md transition-shadow">
                            <div className="relative w-full md:w-64 h-48 md:h-auto">
                                {booking.campsite.images[0] ? (
                                    <Image
                                        src={booking.campsite.images[0]}
                                        alt={booking.campsite.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-muted flex items-center justify-center">No Image</div>
                                )}
                            </div>
                            <div className="flex-1 p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">{booking.campsite.name}</h3>
                                        <div className="flex items-center text-muted-foreground text-sm">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            {booking.campsite.location}
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold dark:bg-green-900 dark:text-green-100">
                                        {booking.status}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            <Calendar className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-semibold">체크인 - 체크아웃</p>
                                            <p className="text-sm font-medium">
                                                {format(new Date(booking.startDate), "yyyy.MM.dd")} - {format(new Date(booking.endDate), "yyyy.MM.dd")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            <CreditCard className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-semibold">결제 금액</p>
                                            <p className="text-sm font-bold">₩{booking.totalPrice.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Link href={`/campsites/${booking.campsiteId}`} className="text-sm text-primary hover:underline">
                                        다시 예약하기
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-muted/30 rounded-xl">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">예약된 내역이 없습니다.</h3>
                    <p className="text-muted-foreground mb-6">아직 떠날 준비가 안 되셨나요? 멋진 캠핑장이 기다리고 있습니다.</p>
                    <Link href="/campsites" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                        캠핑장 둘러보기
                    </Link>
                </div>
            )}
        </div>
    );
}
