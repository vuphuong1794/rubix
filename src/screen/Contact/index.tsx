import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import BgBanner from '@/components/common/BgBanner';
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
      <BgBanner nav='Liên hệ' />
      <iframe
        className='h-[800px] w-full border-y-4 border-blue-600'
        src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9462.662769091721!2d106.6275687!3d10.857961!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a1fc161b16d%3A0x7b1555dd7b5e0080!2zMTEzIMSQw7RuZyBC4bqvYywgVMOibiBDaMOhbmggSGnhu4dwLCBRdeG6rW4gMTIsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e1!3m2!1svi!2s!4v1678776280323!5m2!1svi!2s'
        width='600'
        height='450'
        loading='lazy'
        allowFullScreen
      ></iframe>
      <div className='my-3 flex h-auto w-full items-start  justify-center'>
        <div className='my-20 h-full max-w-[80%] gap-4 rounded-lg border bg-[#1abc9c] p-7 shadow-xl  lg:flex lg:justify-between lg:gap-10'>
          <div className='mb-5 flex flex-1 flex-col gap-6 border-2  border-white px-4 pb-5 pt-7 text-white lg:mb-0 lg:px-8'>
            <h3 className='text-sm font-extrabold text-white md:text-2xl'>
              Liên hệ chúng tôi
            </h3>
            <p className='text-xs font-medium text-white md:text-lg'>
              Hãy liên hệ với chúng tôi để không có hậu quả phiền toái.
            </p>
            <div className='flex flex-col gap-4 text-xs text-white md:text-lg'>
              {data.map((item) => (
                <div key={item.field}>
                  <strong className='text pr-2'>{item.field}</strong>
                  <span className='font-normal'>{item.value}</span>
                </div>
              ))}
            </div>
            <p className='text-justify text-xs italic md:text-lg'>
              Với mong muốn nâng cao đời sống người Việt thông qua việc mua thực
              phẩm online Rubix cam kết mang đến khách hàng những trải nghiệm
              tuyệt vời nhất.
            </p>
          </div>
          <div className='border'></div>
          <div className='flex-1 bg-white px-8 py-5'>
            <h3 className='mb-2 py-3'>Bạn cần hỗ trợ ?</h3>
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
                className='mb-4 h-32 w-full rounded border-2  p-3  outline-none focus:border-blue-700'
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type='submit'
                className='mt-3 h-14 w-full rounded border border-gray-300 bg-black text-white transition-all hover:border-amber-400 hover:text-amber-400'
              >
                <span>Gửi tin nhắn</span>
              </button>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
Contact.getLayout = (page) => <Layout>{page}</Layout>;
export default Contact;
