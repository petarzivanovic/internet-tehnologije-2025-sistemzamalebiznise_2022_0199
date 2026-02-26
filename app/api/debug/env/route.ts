import { NextRequest, NextResponse } from "next/server";
import { addCorsHeaders, handleOptions } from "@/lib/cors";

export function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}

export async function GET(req: NextRequest) {
  const debugInfo = {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
    DATABASE_URL_HOST: process.env.DATABASE_URL?.split('@')[1]?.split(':')[0] || "N/A",
    JWT_SECRET_EXISTS: !!process.env.JWT_SECRET,
  };

  console.log('🔍 Debug Info:', debugInfo);
  
  return addCorsHeaders(req, NextResponse.json(debugInfo, { status: 200 }));
}
