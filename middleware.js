import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("isAuthenticated")?.value;
  const pathname = req.nextUrl.pathname;

  // All protected routes
  const protectedRoutes = [
    "/dashboard",
    "/add-listings",
    "/favorite",
    "/messages",
    "/my-listings",
    "/my-bookings",
    "/my-orders",
    "/profile",
    "/saved"
  ];

  // If the route is protected and user not logged in → redirect to login
  if (protectedRoutes.some(route => pathname === route || pathname.startsWith(route + "/")) && !token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If logged in and trying to visit login/register → redirect to dashboard
  if ((pathname === "/login" || pathname === "/register") && token) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/add-listings/:path*",
    "/favorite/:path*",
    "/messages/:path*",
    "/my-listings/:path*",
    "/my-bookings/:path*",
    "/my-orders/:path*",
    "/profile/:path*",
    "/saved/:path*",
    "/login",
    "/register"
  ],
};
