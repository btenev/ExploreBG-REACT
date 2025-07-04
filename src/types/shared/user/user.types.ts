export interface IUser {
  id: number;
  username: string;
  roles: { role: string }[];
  imageUrl: string | null;
  creationDate: string;
  accountNonLocked: boolean;
}
