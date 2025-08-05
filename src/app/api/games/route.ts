import { NextResponse } from 'next/server';

const _games = [
  { id: 1001, name: 'Crokinole', allowTournaments: true },
  { id: 1002, name: 'Poker (Texas Hold\'em)', allowTournaments: true },
  { id: 1003, name: 'Poker (Pot Limit Omaha(PLO))', allowTournaments: true },
  { id: 1004, name: 'Magic: The Gathering', allowTournaments: true },
  { id: 1005, name: 'Blackjack', allowTournaments: false },
  { id: 1006, name: 'Scat (31)', allowTournaments: false },
];


export async function GET() {
  try {
    const response = {success: true, games: _games};
    return NextResponse.json(response);
  } catch (error) {
    const response = { success: false, message: 'Internal Server Error' };
    console.error('Error fetching games:', error);
    return NextResponse.json(response);
  }
}

export async function POST(request) {
  // Handle POST request logic here
  const data = await request.json();
  // When we are searching for a game, we expect the request body to contain an object with an `id` property.
  if (!data || !data.id) {
    return NextResponse.json({ message: 'Invalid request', game: null });
  }
  const {id} = data;
  const game = _games.find(game => game.id === id);
  return NextResponse.json({ game });
}