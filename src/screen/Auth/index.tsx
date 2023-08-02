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
    <div className='flex  flex-col items-center justify-center bg-background-login bg-cover bg-no-repeat'>
      <div className='bg-opacity-7 flex w-full flex-col items-center gap-2 p-14 text-center text-white '>
        <div className='flex items-center gap-2'>
          <h3 className='text-2xl font-black lg:text-4xl '>Welcome to</h3>
          <h2 className='mb-1 inline text-3xl font-black text-[#00FF00] lg:mb-2 lg:text-5xl'>
            Rubix
          </h2>
        </div>
        <h2 className='w-[100%] text-sm font-black  md:text-lg lg:text-2xl'>
          Trang web cung cấp thực phẩm tươi sống mới nổi !!!
        </h2>
      </div>
      <div className='mt-6 mb-20 min-w-[50%] rounded-[8px] bg-white pb-10 focus-within:shadow-login1 lg:min-w-[36%]'>
        <div className='grid h-[70px] w-full grid-cols-2'>
          <Link
            href='/login'
            className={`${
              isChoose ? 'bg-white' : 'bg-[#ebebeb]'
            } flex items-center justify-center text-xl font-semibold`}
            onClick={() => dispatch(login())}
          >
            Đăng nhập
          </Link>
          <Link
            href='/signup'
            className={`${
              !isChoose ? 'bg-white' : 'bg-[#ebebeb]'
            } flex items-center justify-center text-xl font-semibold`}
            onClick={() => dispatch(register())}
          >
            Tạo tài khoản
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
