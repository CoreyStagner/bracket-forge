import { NextResponse } from 'next/server';
// import type { NextApiRequest, NextApiResponse } from 'next'

const healthCheckResponse = {
  status: 'ok',
  timestamp: new Date().toISOString(),
  message: 'Server is healthy',
  version: '1.0.0',
};


export async function GET() {
  // Handle GET request logic here
  return NextResponse.json({ message: 'This is a GET request!', data: healthCheckResponse });
}

export async function POST() {
  // Handle POST request logic here
  // const data = await request.json(); // Example: getting JSON data from the request body
  return NextResponse.json({ message: 'This is a POST request!', data: healthCheckResponse });
}