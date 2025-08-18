import path from 'path';

export type Role = 'admin' | 'user' | 'guest';
export type Account = {
  email: string;
  password: string;
};
export type authSavedConfig = {
  accounts: Account[]; //1 role may have multiple accounts
  storageDir: string;
};

export const authConfig: Record<Exclude<Role, 'guest'>, authSavedConfig> = {
  admin: {
    accounts: [{ email: 'admin8910@gmail.com', password: '123456' }],
    storageDir: path.join(process.cwd(), 'playwright/.auth/admin'),
  },
  user: {
    accounts: [
      // {email: "staff8910@gmail.com", password: "123456"},
      { email: 'staff28910@gmail.com', password: '123456' },
    ],
    storageDir: path.join(process.cwd(), 'playwright/.auth/user'),
  },
};
export const storageStatePath = (role: Exclude<Role, 'guest'>) =>
  path.join(authConfig[role].storageDir, `state-${role}.json`);
