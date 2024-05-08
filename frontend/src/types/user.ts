export type User = {
    username: string;
    expiredAt: number;
    token: string;
    avatar?: string;
    id: string;
    roles: [];
    email: string;
  };