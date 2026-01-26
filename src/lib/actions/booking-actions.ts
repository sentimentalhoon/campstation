"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBooking(campsiteId: string, startDate: Date, endDate: Date, totalPrice: number) {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: "로그인이 필요합니다." };
    }

    try {
        const booking = await prisma.booking.create({
            data: {
                userId: session.user.id,
                campsiteId,
                startDate,
                endDate,
                totalPrice,
                status: "CONFIRMED", // For now, auto-confirm
            },
        });

        revalidatePath(`/bookings`);
        return { success: "예약이 완료되었습니다!", bookingId: booking.id };
    } catch (error) {
        console.error("Booking Error:", error);
        return { error: "예약 처리 중 오류가 발생했습니다." };
    }
}

export async function getUserBookings() {
    const session = await auth();
    if (!session?.user?.id) return { data: [] };

    try {
        const bookings = await prisma.booking.findMany({
            where: { userId: session.user.id },
            include: {
                campsite: {
                    select: {
                        name: true,
                        images: true,
                        location: true,
                    }
                }
            },
            orderBy: { startDate: "desc" }
        });
        return { data: bookings };
    } catch (error) {
        return { error: "예약 목록을 불러올 수 없습니다." };
    }
}
