import { useFormik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import * as Yup from 'yup';

import { Button, Input } from '@/components/common';
import Layout from '@/components/layout/Layout';

import { Auth } from '@/screen';
import { ReqLogin, WithLayout } from '@/shared/types';

const Login: NextPage & WithLayout = () => {
  const [isShowForgotPassword, setIsShowForgotPassword] = useState(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const toggleAuthLogin = () => {
    setIsShowForgotPassword(!isShowForgotPassword);
  };

  const initialValues: ReqLogin = {
    email: '',
    password: '',
  };
  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: async (values) => {
      const reqLogin = {
        email: values.email,
        password: values.password,
      };

      console.log(reqLogin);
      // setIsLoading(true);
      const res = await signIn('credentials', {
        ...reqLogin,
        redirect: false,
      });

      if (res?.error) {
        // setIsLoading(false);
        // message.error(res.error);

        setError(res.error);
        return;
      }

      if (res?.ok) {
        // setIsLoading(false);
        router.push('/');
        // message.success('Login successfully');
      }
    },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Invalid email address.')
        .required('You must enter your email.'),
      password: Yup.string().required('You must enter your password.'),
    }),
  });
  return (
    <div>
      {isShowForgotPassword ? (
        <form onSubmit={formik.handleSubmit} className='w-full pt-4'>
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

          <span
            className='flex w-full items-center justify-between pt-4'
            onClick={toggleAuthLogin}
          >
            <Link href='/login' className='text-xs hover:text-amber-400'>
              Forgot Password?
            </Link>
          </span>

          {error && <span className='pt-2 text-sm text-red-600'>{error}</span>}
          <Button
            type='submit'
            large
            className='my-4 rounded-lg bg-[#1a1a1a] text-sm text-white transition-all hover:bg-amber-400 hover:shadow-lg'
            title='LOGIN'
          />
        </form>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <h4 className='p-2'>Reset your password</h4>
          <span className='pb-4'>
            We will send you an email to reset your password.
          </span>
          <form
            onSubmit={formik.handleSubmit}
            className='flex w-full flex-col items-center justify-center pt-4'
          >
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

            {/* {error && <span className="text-light-error text-sm pt-2">{error}</span>} */}
            <Button
              type='submit'
              large
              className='my-4 rounded-lg bg-[#1a1a1a] text-sm text-white transition-all hover:bg-amber-400 hover:shadow-lg'
              title='SUBMIT'
            />
            <Button
              onClick={toggleAuthLogin}
              type='submit'
              small
              className='my-4 rounded-lg border border-stone-900 bg-transparent text-sm text-black transition-buttonLogin hover:border-amber-400 hover:text-amber-400 hover:shadow-lg'
              title='Back to Login'
            />
          </form>
        </div>
      )}
    </div>
  );
};

Login.getLayout = (page) => (
  <Layout>
    <Auth>{page}</Auth>
  </Layout>
);

export default Login;
