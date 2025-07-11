import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.API_BASE_URL?.replace(/\/api$/, '') || 'http://localhost:8000';

export async function GET(req: NextRequest) {
  const url = `${BACKEND_URL}/doctors`;
  const res = await fetch(url, { method: 'GET' });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(req: NextRequest) {
  const url = `${BACKEND_URL}/doctors`;
  const body = await req.json();
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
} 