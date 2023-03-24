import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { CmsApi } from '@/api/cms-api';

// const handleRefreshToken = async (token: JWT) => {
//   try {
//     const tokenData = await CmsApi.refreshToken({
//       refresh_token: token.refreshToken,
//     });

//     const {
//       access_token: accessToken,
//       refresh_token: refreshToken,
//       expiresIn: accessTokenExpires,
//     } = tokenData.data;
//     // const accessTokenExpirationTime =
//     //   (jwt_decode<JwtPayload>(accessToken).exp as number) * 1000 - 10;
//     return {
//       ...token,
//       accessToken,
//       accessTokenExpires,
//       refreshToken: refreshToken ?? token.refreshToken, // Fall back to old refresh token
//     };
//   } catch (error) {
//     console.log('error', error);

//     return {
//       ...token,
//       error: ERROR_TOKEN,
//     };
//   }
// };

export const nextAuthOptions = {
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
          if (!credentials) {
            return null;
          }
          const res = await CmsApi.login({
            email: credentials.email,
            password: credentials.password,
            requestFrom: 'CMS',
          });

          console.log('res', res);

          if (res) {
            const {
              access_token: accessToken,
              refresh_token: refreshToken,
              expiresIn: expiresIn,
            } = res.data.token;

            const { id, email, username } = res.data.user;
            return {
              id,
              email,
              username,
              accessToken,
              expiresIn,
              refreshToken,
            };
            //return new object user contain token
          }
          return null; //if the data is null, return null
        } catch (e: any) {
          console.log('error', e);

          throw new Error(e.response.data.message); //if the server response is an error, throw an error with the message from the server
        }
      },
    }),
  ],
  callbacks: {
    //The jwt() callback is called when a new token is created.
    async jwt({ user, token }) {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.username = user.username;
      }

      return token;
      // const expiresInToken = token?.expiresIn;
      // const expirationTime = expiresInToken.exp * 1000;
      // const currentTime = Date.now();

      // if (expirationTime && expirationTime - currentTime > 30 * 60 * 1000) {
      // Token is still valid, just return it
      //   return token;
      // }

      // Token has expired or will expire in the next 30 minutes, refresh it
      // const refreshedToken = await handleRefreshToken(token);
    },
    //The session() callback is called when a user logs in or log out
    async session({ session, token }) {
      if (token) {
        session.user.userId = token.userId;
        session.user.email = token.email;
        session.user.username = token.username;
      }

      return session;
    },
  },
};

export default NextAuth(nextAuthOptions);
