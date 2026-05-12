import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // =========================
  //  protect control
  // =========================
  const isAdmin = req.cookies.get("is_admin")?.value;

  if (pathname.startsWith("/control")) {
    if (isAdmin !== "true") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // =========================
  //  protect api routes
  // =========================
  if (pathname.startsWith("/api")) {
    const secret = req.headers.get("x-api-key");

    if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}