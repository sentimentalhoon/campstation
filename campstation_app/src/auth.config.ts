import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard") ||
                nextUrl.pathname.startsWith("/bookings");

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                // If logged in and on login/signup page, redirect to home or dashboard
                if (nextUrl.pathname === "/login" || nextUrl.pathname === "/signup") {
                    return Response.redirect(new URL("/campsites", nextUrl));
                }
            }
            return true;
        },
    },
    providers: [], // Added later in auth.ts
} satisfies NextAuthConfig;
