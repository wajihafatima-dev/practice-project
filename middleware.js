// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const response = NextResponse.next();

  // Set CORS headers
  response.headers.set("Access-Control-Allow-Origin", "*"); // Change '*' to your frontend URL for specific access
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Handle preflight (OPTIONS) requests for CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: response.headers,
    });
  }

  return response;
}

export const config = {
  matcher: "/api/:path*", // Apply this middleware to all routes under /api
};
