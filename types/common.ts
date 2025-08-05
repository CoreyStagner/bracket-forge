interface Game {
  id: string;
  name: string;
  allowTournaments: boolean;
};

interface Player {
  id: string;
  fName: string;
  lName: string;
  username: string;
  email: string;
  enrolledTournaments: Tournament[];
}

interface Table {
  id: string;
  name: string;
  location: string;
  description: string;
  capacity?: number;
  gameId: Game;
  players: Player[];
}

interface Tournament {
  id: string;
  location: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  gameId: Game;
  players: Player[];
}