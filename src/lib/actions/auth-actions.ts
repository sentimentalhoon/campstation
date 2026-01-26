"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LoginSchema, RegisterSchema } from "@/lib/schemas";
import { redirect } from "next/navigation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "유효하지 않은 입력입니다." };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/campsites",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "이메일 또는 비밀번호가 일치하지 않습니다." };
                default:
                    return { error: "알 수 없는 오류가 발생했습니다." };
            }
        }
        throw error;
    }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "유효하지 않은 입력입니다." };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { error: "이미 사용 중인 이메일입니다." };
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    // TODO: Send verification email

    return { success: "회원가입이 완료되었습니다! 로그인해주세요." };
};
