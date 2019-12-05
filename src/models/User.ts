export type User = {
  id?: number;
  name: string;
  email: string;
  googleId?: number;
  firstname?: string;
  lastname?: string;
  avatarUrl?: string;
  score?: number;
}

export type ChannelUser = {
  user: User;
};
