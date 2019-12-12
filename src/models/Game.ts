import { STATUS } from '../config/game';

export type GameEvent = {
  duration: number;
}

export type Track = {
  order: number | string,
  track: string;
  pauseDuration: number;
};

export type Result = {
  artist: string;
  title: string;
  status?: STATUS;
  order?: number;
};

export type Answer = {
  order: number;
  input: string;
};

export type AnswerCheck = {
  userId: number;
  points: number;
  artist: boolean;
  title: boolean;
};
