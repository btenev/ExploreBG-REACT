import { IOwner } from '../owner';

export interface IComment {
  id: number;
  message: string;
  owner: IOwner;
  lastUpdateDate: string;
}
