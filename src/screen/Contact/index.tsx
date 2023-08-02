import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import Layout from '@/components/layout/Layout';

import { CmsApi } from '@/api/cms-api';
import { WithLayout } from '@/shared/types';

interface PropsContact {
  field: string;
  value: string;
}

const data: PropsContact[] = [
  {
    field: 'Địa chỉ:',
    value: '113 Bà Huyện Thanh Quan, Phường 9, Quận 3, TP.HCM',
  },
  {
    field: 'Số điện thoại:',
    value: '+1 800 1236879',
  },
  {
    field: 'Email:',
    value: 'thanhbkbk111@gmail.com',
  },
  {
    field: 'Thời gian mở của:',
    value: 'Mon - Fri: 8:00 - 18:00',
  },
];

type FormValuesProps = {
  name: string;
  email: string;
};

const Contact: WithLayout = () => {
  const [message, setMessage] = React.useState<string>('');
  const ContactSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên'),
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Vui lòng nhập email'),
  });

  const defaultValues: FormValuesProps = {
    name: '',
    email: '',
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ContactSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  const onSubmit = async ({ email, name }: FormValuesProps) => {
    if (!message) {
      toast.error('Vui lòng nhập nội dung tin nhắn');
      return;
    }
    try {
      const text = `Người dùng: ${name} \n Có email: ${email} \n Gửi tin nhắn với nội dung: ${message}`;
      const _ = await CmsApi.sendMailContact(text);
      toast.success('Gửi phản hồi thành công');
      reset();
    } catch (error) {
      toast.error('Gửi phản hồi không thành công');
    }
  };

  return (
    <div>
      <iframe
        className='h-[600px] w-full'
        src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9462.662769091721!2d106.6275687!3d10.857961!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a1fc161b16d%3A0x7b1555dd7b5e0080!2zMTEzIMSQw7RuZyBC4bqvYywgVMOibiBDaMOhbmggSGnhu4dwLCBRdeG6rW4gMTIsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e1!3m2!1svi!2s!4v1678776280323!5m2!1svi!2s'
        width='600'
        height='450'
        loading='lazy'
        allowFullScreen
      ></iframe>
      <div className='flex w-full items-start justify-center'>
        <div className='my-20 flex max-w-[80%] items-start justify-between gap-10'>
          <div className='flex w-1/2 flex-col gap-6'>
            <h3 className='font-bold'>Liên hệ chúng tôi</h3>
            <p className='text-gray-700'>
              Hãy liên hệ với chúng tôi để không có hậu quả phiền toái.
            </p>
            <div className='flex flex-col gap-2 text-gray-700'>
              {data.map((item) => (
                <div key={item.field}>
                  <strong className='text pr-2'>{item.field}</strong>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
              name='name'
              type='text'
              placeholder='Tên'
              className='hover:border-transparent focus:outline-none'
            />
            <RHFTextField
              name='email'
              type='text'
              placeholder='Email'
              className='my-3 rounded hover:border-transparent focus:outline-none'
            />
            <textarea
              placeholder='Tin nhắn'
              className='mb-4 h-32 w-full rounded border border-gray-300 outline-none'
              style={{
                paddingTop: '1rem',
                paddingLeft: '1rem',
              }}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type='submit'
              className='h-14 w-full rounded border border-gray-300 bg-black font-bold text-white transition-all hover:bg-gray-900'
            >
              <span>Gửi tin nhắn</span>
            </button>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
Contact.getLayout = (page) => <Layout>{page}</Layout>;
export default Contact;
