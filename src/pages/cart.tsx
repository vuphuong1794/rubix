import { getSession } from 'next-auth/react';

import { requireAuth } from '@/components/requireAuth/Auth';

import { ROUTES } from '@/constant';
import { Cart } from '@/screen';

export default Cart;

export const getServerSideProps = requireAuth(async (ctx) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.LOGIN,
      },
    };
  }
  return {
    props: {},
  };
});
