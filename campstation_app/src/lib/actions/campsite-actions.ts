"use server";

import { prisma } from "@/lib/prisma";

export async function getCampsites() {
    try {
        const campsites = await prisma.campsite.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                _count: {
                    select: { reviews: true },
                },
            },
        });
        return { data: campsites };
    } catch (error) {
        console.error("Failed to fetch campsites:", error);
        return { error: "캠핑장 목록을 불러오는데 실패했습니다." };
    }
}

export async function getCampsiteById(id: string) {
    try {
        const campsite = await prisma.campsite.findUnique({
            where: { id },
            include: {
                owner: {
                    select: { name: true, image: true },
                },
                reviews: {
                    include: {
                        user: {
                            select: { name: true, image: true },
                        },
                    },
                    orderBy: { createdAt: "desc" },
                },
            },
        });
        return { data: campsite };
    } catch (error) {
        console.error("Failed to fetch campsite:", error);
        return { error: "캠핑장 정보를 불러오는데 실패했습니다." };
    }
}
