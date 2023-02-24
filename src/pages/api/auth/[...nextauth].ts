import axios from 'axios';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { BASE_URL_API, ERROR_TOKEN, ROUTES } from '@/constant';

const handleRefreshToken = async (token: JWT) => {
  try {
    const tokenData = await axios
      .post(`${BASE_URL_API}/account/refresh-token`, {
        refreshToken: token.refreshToken,
      })
      .then((value) => value.data.data);

    console.log('refresh token here:', tokenData);
    const { accessToken: accessToken, refreshToken: refreshToken } = tokenData;
    const accessTokenExpirationTime =
      (jwt_decode<JwtPayload>(accessToken).exp as number) * 1000 - 10;
    return {
      ...token,
      accessToken,
      accessTokenExpires: accessTokenExpirationTime,
      refreshToken: refreshToken ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    return {
      ...token,
      error: ERROR_TOKEN,
    };
  }
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@domain.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          //login
          const data = await axios.post(`${BASE_URL_API}/account/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (data) {
            const { accessToken: accessToken, refreshToken: refreshToken } =
              data.data.user; //We get the access token and the refresh token from the data object.

            const accessTokenExpirationTime =
              (jwt_decode<JwtPayload>(accessToken).exp as number) * 1000 - 10;
            //minus 10 seconds before expiration time to prevent token expiration error in the browser side unit ms

            return {
              ...data.data.user,
              accessToken,
              accessTokenExpires: accessTokenExpirationTime,
              refreshToken,
            };
            //return new object user contain token
          }
          return null; //if the data is null, return null
        } catch (e: any) {
          console.log('error:', e);

          throw new Error(e.response.data.message); //if the server response is an error, throw an error with the message from the server
        }
      },
    }),
  ],
  callbacks: {
    //The jwt() callback is called when a new token is created.
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          user,
        };
      }
      return token;
    },
    //The session() callback is called when a user logs in or log out
    async session({ session, token }) {
      if (session) {
        return {
          ...session,
          token,
        };
      }
      return session;
    },
  },
  //The signIn page is the page that the user is redirected to when they are not logged in.
  pages: {
    signIn: ROUTES.LOGIN,
  },
});
