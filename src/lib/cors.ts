// src/app/lib/cors.ts
import { NextRequest, NextResponse } from 'next/server'

export async function handleCors(req: NextRequest) {
  const origin = req.headers.get('origin') || '*'

  const headers = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  }

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers,
    })
  }

  return headers
}
