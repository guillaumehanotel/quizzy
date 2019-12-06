export type Stat = {
  averageScore: number;
  bestScore: number;
  favoriteCategory: Category;
  games: [Game];
  totalGames: number;
  winGames: number;
}

type Category = {
  id: number;
  name: string;
  picture_url: string;
  created_at: string
  updated_at: string
}

export type Game = {
  points: number;
  quizz_id: number;
  user_id: number;
  winner: number;
  created_at: string
  updated_at: string
}

export type ChartGame = {
  date: string;
  points: number;
}