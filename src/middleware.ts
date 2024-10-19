
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function myMiddleware(request: NextRequest) {
   
    const protectedPaths = ["/confirm-email","/accounts", "/dashboard", "/settings","/character",""]; // Definir las rutas que requieren autenticación

    if (protectedPaths.includes(request.nextUrl.pathname)) {
        const cookie = request.cookies.get('token')

        if (!cookie) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        return NextResponse.next(); 
    }
    
    return NextResponse.next(); 
}

