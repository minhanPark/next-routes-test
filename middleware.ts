import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/about")) {
    // 보여지는 url에 내용은 다시 씀
    return NextResponse.rewrite(new URL("/about/1", request.url));
  }
  // 위와 같은 방식으로 미들웨어 내부에서 조건절을 사용할 수 있다
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/api")) {
    const newResponseHeaders = new Headers(request.headers);
    newResponseHeaders.set("x-something", "hello world");

    const response = NextResponse.next({
      request: {
        headers: newResponseHeaders,
      },
    });
    response.cookies.set({
      name: "x-hi",
      value: "bye",
      path: "/",
    });
    return response;
  }
}

export const config = {
  matcher: ["/about/:path*", "/dashboard/:path*", "/api/:path*"],
};
