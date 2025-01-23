// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Handle CORS preflight requests
export function middleware(request: NextRequest) {
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
                'Access-Control-Max-Age': '86400',
            },
        });
    }

    // Add CORS headers to all responses
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

    // Apply Clerk middleware after CORS headers are set
    return clerkMiddleware()(request, response);
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        '/((?!_next/static|_next/image|favicon.ico).*)',
        '/(api|trpc)(.*)',
        '/api/:path*',
    ],
};