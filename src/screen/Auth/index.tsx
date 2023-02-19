import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

import Layout from '@/components/layout/Layout';

import { WithLayout } from '@/shared/types';

interface LoginProps {
  children: React.ReactElement;
}

const Auth: NextPage<LoginProps> & WithLayout = ({ children }) => {
  const [isChooseRegister, setIsChooseRegister] = useState<boolean>(true);

  const handleClickLogin = () => {
    setIsChooseRegister(false);
  };

  const handleClickRegister = () => {
    setIsChooseRegister(true);
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='mt-16 mb-20 min-w-[36%] rounded-[8px] bg-[#ffffff]  pb-10 shadow-login'>
        <div className='grid h-[80px] w-full grid-cols-2'>
          <Link
            href='/login'
            className={`${
              isChooseRegister ? 'bg-[#ebebeb]' : 'bg-[bg-white]'
            } flex items-center justify-center text-xl font-semibold`}
            onClick={handleClickLogin}
          >
            Login
          </Link>
          <Link
            href='/signup'
            className={`${
              !isChooseRegister ? 'bg-[#ebebeb]' : '#ebebeb]'
            } flex items-center justify-center text-xl font-semibold`}
            onClick={handleClickRegister}
          >
            Create Account
          </Link>
        </div>
        <div className='px-10 pt-4'>{children}</div>
      </div>
    </div>
  );
};

Auth.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Auth;
