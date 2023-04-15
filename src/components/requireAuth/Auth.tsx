import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

import { ROUTES } from '@/constant';

export function requireAuth(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx);

    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: ROUTES.LOGIN,
        },
      };
    }
    return await gssp(ctx);
  };
}
