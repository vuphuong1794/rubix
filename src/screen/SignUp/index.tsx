import { useFormik } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import * as Yup from 'yup';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Layout from '@/components/layout/Layout';

import { CmsApi } from '@/api/cms-api';
import { ROUTES } from '@/constant';
import Auth from '@/screen/Auth';
import { WithLayout } from '@/shared/types';
import { ReqRegister } from '@/shared/types/authType';

const Register: NextPage & WithLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const initialValues: ReqRegister = {
    username: '',
    email: '',
    password: '',
  };
  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const _ = await CmsApi.register({
          username: values.username,
          email: values.email,
          password: values.password,
        });

        router.push(ROUTES.LOGIN);
      } catch (e: any) {
        setIsLoading(false);
        setError(e.response.data.error);
      }
    },

    validationSchema: Yup.object().shape({
      username: Yup.string().required('You must enter your username.'),
      email: Yup.string()
        .email('Invalid email address.')
        .required('You must enter your email.'),
      password: Yup.string().required('You must enter your password.'),
    }),
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex w-full flex-col gap-4 pt-4'
    >
      <Input
        id='username'
        name='username'
        type='username'
        placeholder='Tên đăng nhập'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username ? (
        <div className='text-sm text-red-600'>{formik.errors.username}</div>
      ) : null}
      <Input
        id='email'
        name='email'
        type='email'
        placeholder='Email'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className='text-sm text-red-600'>{formik.errors.email}</div>
      ) : null}
      <Input
        id='password'
        name='password'
        placeholder='Mật khẩu'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        eyeEnable={true}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className='text-sm text-red-600'>{formik.errors.password}</div>
      ) : null}
      <div className='flex w-full items-center justify-between'></div>
      {error && <span className='pt-2 text-sm text-red-600'>{error}</span>}
      <Button
        type='submit'
        large
        className=' rounded-lg bg-[#1a1a1a] text-sm text-white transition-all hover:bg-amber-400 hover:shadow-lg'
        title={`${isLoading ? 'Đang tải...' : 'Đăng ký'}`}
      />
    </form>
  );
};

Register.getLayout = (page: JSX.Element) => (
  <Layout>
    <Auth>{page}</Auth>
  </Layout>
);

export default Register;
