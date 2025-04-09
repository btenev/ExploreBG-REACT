export interface IUserSession {
  userId: number;
  username: string;
  userRoles: string[];
  userImage?: string;
  isAdmin?: boolean;
  isAdminOrModerator?: boolean;
}
