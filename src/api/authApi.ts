import { AuthClient } from './authClient';
import { IUserSession } from '../types';

const authClient = new AuthClient();

export const authApi = {
  login: (data: { email: string; password: string }) =>
    authClient.login<IUserSession>(data),
};
