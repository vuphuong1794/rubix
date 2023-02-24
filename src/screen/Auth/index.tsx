import { NextPage } from 'next';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { login, register, selectIsChoose } from '@/features/auth/authSlice';
import { WithLayout } from '@/shared/types';

interface LoginProps {
  children: React.ReactElement;
}

const Auth: NextPage<LoginProps> & WithLayout = ({ children }) => {
  const dispatch = useAppDispatch();
  const isChoose = useAppSelector(selectIsChoose);

  return (
    <div className='flex items-center justify-center'>
      <div className='mt-16 mb-20 min-w-[36%] rounded-[8px] bg-[#ffffff]  pb-10 shadow-login'>
        <div className='grid h-[70px] w-full grid-cols-2'>
          <Link
            href='/login'
            className={`${
              isChoose ? 'bg-white' : 'bg-[#ebebeb]'
            } flex items-center justify-center text-xl font-semibold`}
            onClick={() => dispatch(login())}
          >
            Login
          </Link>
          <Link
            href='/signup'
            className={`${
              !isChoose ? 'bg-white' : 'bg-[#ebebeb]'
            } flex items-center justify-center text-xl font-semibold`}
            onClick={() => dispatch(register())}
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
