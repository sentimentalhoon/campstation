"use client";

import { Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export function HeroSearch() {
    const [date, setDate] = useState<DateRange | undefined>();

    return (
        <div className="relative bg-primary py-8 px-4 md:py-16 md:px-8 text-primary-foreground rounded-b-3xl shadow-lg">
            <div className="container mx-auto max-w-4xl space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl md:text-4xl font-bold font-heading">어디로 떠나시나요?</h1>
                    <p className="text-primary-foreground/80 text-sm md:text-base">전국 2,500여 개 캠핑장을 실시간으로 예약하세요.</p>
                </div>

                <div className="bg-background/95 backdrop-blur text-foreground p-4 rounded-2xl shadow-xl space-y-4 md:space-y-0 md:grid md:grid-cols-12 md:gap-4 md:items-center">
                    {/* Keyword Search */}
                    <div className="col-span-12 md:col-span-5 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="제주도, 강릉, 캠핑장 이름..."
                            className="pl-9 h-12 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                    </div>

                    {/* Date Picker Trigger */}
                    <div className="col-span-12 md:col-span-5">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full h-12 justify-start text-left font-normal bg-muted/50 border-none"
                                >
                                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "MM.dd")} - {format(date.to, "MM.dd")}
                                            </>
                                        ) : (
                                            format(date.from, "MM.dd")
                                        )
                                    ) : (
                                        <span className="text-muted-foreground">날짜 선택</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Search Button */}
                    <div className="col-span-12 md:col-span-2">
                        <Button size="lg" className="w-full h-12 text-md font-bold shadow-md">
                            검색
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
