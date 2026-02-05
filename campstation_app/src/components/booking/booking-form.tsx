"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format, differenceInDays } from "date-fns";
import { createBooking } from "@/lib/actions/booking-actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface BookingFormProps {
    campsiteId: string;
    pricePerNight: number;
}

export function BookingForm({ campsiteId, pricePerNight }: BookingFormProps) {
    const router = useRouter();
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 1),
    });
    const [isPending, setIsPending] = useState(false);

    const nights = date?.from && date?.to ? differenceInDays(date.to, date.from) : 0;
    const totalPrice = nights * pricePerNight;

    const handleBooking = async () => {
        if (!date?.from || !date?.to) return;
        setIsPending(true);

        const result = await createBooking(campsiteId, date.from, date.to, totalPrice);

        if (result.success) {
            alert("예약이 완료되었습니다!");
            router.push("/bookings");
        } else {
            alert(result.error);
            if (result.error === "로그인이 필요합니다.") {
                router.push("/login");
            }
        }
        setIsPending(false);
    };

    return (
        <div className="space-y-6">
            <div className="border rounded-lg p-3 md:p-0 border-none">
                <label className="text-sm font-medium mb-1.5 block">날짜 선택</label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "LLL dd, y")} -{" "}
                                        {format(date.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(date.from, "LLL dd, y")
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                            disabled={(date) => date < new Date()}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <Button
                size="lg"
                className="w-full text-lg"
                onClick={handleBooking}
                disabled={!date?.from || !date?.to || nights < 1 || isPending}
            >
                {isPending ? "처리 중..." : "예약하기"}
            </Button>

            {nights > 0 && (
                <>
                    <p className="text-center text-xs text-muted-foreground">
                        예약 확정 전에는 요금이 청구되지 않습니다.
                    </p>

                    <div className="flex justify-between text-sm pt-4 border-t">
                        <span className="underline">₩{pricePerNight.toLocaleString()} x {nights}박</span>
                        <span>₩{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold pt-2">
                        <span>총 합계</span>
                        <span>₩{totalPrice.toLocaleString()}</span>
                    </div>
                </>
            )}
        </div>
    );
}
