import { NextPage } from 'next';
import React from 'react';

import Layout from '@/components/layout/Layout';

import { WithLayout } from '@/shared/types';

const Login: NextPage & WithLayout = () => {
  return <div>Order</div>;
};

Login.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Login;
