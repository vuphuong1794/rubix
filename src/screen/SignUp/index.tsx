import axios from 'axios';
import { useFormik } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import * as Yup from 'yup';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Layout from '@/components/layout/Layout';

import { BASE_URL_API, ROUTES } from '@/constant';
import Auth from '@/screen/Auth';
import { ReqRegister, WithLayout } from '@/shared/types';

const Register: NextPage & WithLayout = () => {
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
      console.log(values);
      try {
        const _ = await axios.post(`${BASE_URL_API}/account/register`, {
          Name: values.username,
          Email: values.email,
          Password: values.password,
        });

        router.push(ROUTES.LOGIN);
      } catch (e: any) {
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
    <form onSubmit={formik.handleSubmit} className='w-full pt-4'>
      <Input
        id='username'
        name='username'
        type='username'
        placeholder='Username'
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
        placeholder='Password'
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
        className='my-4 rounded-lg bg-[#1a1a1a] text-sm text-white transition-all hover:bg-amber-400 hover:shadow-lg'
        title='CREATE AN ACCOUNT'
      />
    </form>
  );
};

Register.getLayout = (page: any) => (
  <Layout>
    <Auth>{page}</Auth>
  </Layout>
);

export default Register;
