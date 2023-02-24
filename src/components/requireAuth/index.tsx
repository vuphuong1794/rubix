import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

import { ROUTES } from '../../constant/index';

export default function requireAuth(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx);

    console.log(session);

    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: ROUTES.LOGIN,
        },
      };
    }

    return gssp(ctx);
  };
}
