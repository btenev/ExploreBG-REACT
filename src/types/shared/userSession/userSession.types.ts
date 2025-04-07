export interface IUserSession {
  userId: number;
  userRoles: string[];
  userImage?: string;
  isAdmin?: boolean;
  isAdminOrModerator?: boolean;
}
