import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.API_BASE_URL?.replace(/\/api$/, '') || 'http://localhost:8000';

export async function POST(req: NextRequest) {
  const url = `${BACKEND_URL}/files`;
  const body = await req.formData();
  const res = await fetch(url, {
    method: 'POST',
    body,
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
} 