import { getSession } from 'next-auth/react';

import { ROUTES } from '@/constant';
import { Cart } from '@/screen';

export default Cart;

export const getServerSideProps = async () => {
  const session = await getSession();
  console.log('session', session);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.CART,
      },
    };
  }
  return {
    props: {
      session: null,
    },
  };
};
