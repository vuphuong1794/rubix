import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      userId: string;
      username: string;
      accessToken: string;
      error: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    username: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string;
    username: string;
  }
}
