import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import { ROUTES } from '@/constant';
import { Login } from '@/screen';

export default Login;

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);

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
