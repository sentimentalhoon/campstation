"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { LoginSchema } from "@/lib/schemas";
import { login } from "@/lib/actions/auth-actions";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";

export default function LoginPage() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values).then((data) => {
                if (data?.error) {
                    setError(data.error);
                }
            });
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md space-y-8 rounded-xl border bg-card p-10 shadow-lg">
                <div className="flex flex-col items-center justify-center text-center">
                    <Logo />
                    <h2 className="mt-6 text-2xl font-bold tracking-tight">
                        다시 만나서 반가워요!
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        이메일로 로그인하세요
                    </p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                            이메일
                        </label>
                        <input
                            {...form.register("email")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            disabled={isPending}
                        />
                        {form.formState.errors.email && (
                            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium leading-none" htmlFor="password">
                                비밀번호
                            </label>
                            <Link href="#" className="text-sm text-primary hover:underline">
                                비밀번호 찾기
                            </Link>
                        </div>
                        <input
                            {...form.register("password")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            disabled={isPending}
                        />
                        {form.formState.errors.password && (
                            <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
                        )}
                    </div>

                    {error && (
                        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "로그인 중..." : "로그인"}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    계정이 없으신가요?{" "}
                    <Link href="/signup" className="font-semibold text-primary hover:underline">
                        회원가입
                    </Link>
                </div>
            </div>
        </div>
    );
}
