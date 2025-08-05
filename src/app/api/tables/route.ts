import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const events = [
      { id: 1001, name: 'Stooges BAG', gamesSupported: [1006], activeGames: [], location: 'Stooges', description: 'A fun event for all!', startDate: new Date('2023-10-01T10:00:00Z'), endDate: new Date('2023-10-01T18:00:00Z') },
    ];
    const response = {success: true, events};
    return NextResponse.json(response);
  } catch (error) {
    const response = { success: false, message: 'Internal Server Error' };
    console.error('Error fetching events:', error);
    return NextResponse.json(response);
  }
}

export async function POST(request) {
  // Handle POST request logic here
  const data = await request.json(); // Example: getting JSON data from the request body
  return NextResponse.json({ message: 'This is a POST request!', receivedData: data });
}