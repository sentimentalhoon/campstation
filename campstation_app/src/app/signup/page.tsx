"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { RegisterSchema } from "@/lib/schemas";
import { register } from "@/lib/actions/auth-actions";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";

export default function SignupPage() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values).then((data) => {
                if (data.error) {
                    setError(data.error);
                }
                if (data.success) {
                    setSuccess(data.success);
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
                        환영합니다!
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Campstation과 함께 새로운 여정을 시작하세요.
                    </p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="name">
                            이름
                        </label>
                        <input
                            {...form.register("name")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            id="name"
                            placeholder="홍길동"
                            disabled={isPending}
                        />
                        {form.formState.errors.name && (
                            <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="email">
                            이메일
                        </label>
                        <input
                            {...form.register("email")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            disabled={isPending}
                        />
                        {form.formState.errors.email && (
                            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="password">
                            비밀번호
                        </label>
                        <input
                            {...form.register("password")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            id="password"
                            type="password"
                            placeholder="6자리 이상"
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
                    {success && (
                        <div className="rounded-md bg-green-500/15 p-3 text-sm text-green-500">
                            {success}
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "가입 중..." : "회원가입"}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    이미 계정이 있으신가요?{" "}
                    <Link href="/login" className="font-semibold text-primary hover:underline">
                        로그인
                    </Link>
                </div>
            </div>
        </div>
    );
}
