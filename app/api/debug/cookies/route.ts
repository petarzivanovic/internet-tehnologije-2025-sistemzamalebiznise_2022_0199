import { NextRequest, NextResponse } from "next/server";
import { addCorsHeaders, handleOptions } from "@/lib/cors";

export function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}

export async function GET(req: NextRequest) {
  const cookies = req.cookies.getAll();
  const cookieString = req.headers.get('cookie') || 'Nema cookies';

  const debugInfo = {
    all_cookies: cookies.map(c => ({ name: c.name, value: c.value?.substring(0, 20) + '...' })),
    cookie_header: cookieString,
    token_exists: !!req.cookies.get('token')?.value,
  };

  console.log('🍪 Cookie Debug:', debugInfo);
  
  return addCorsHeaders(req, NextResponse.json(debugInfo, { status: 200 }));
}
