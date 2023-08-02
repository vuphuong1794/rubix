import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Modal } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';

import { CmsApi } from '@/api/cms-api';
import { useAppSelector } from '@/app/hooks';
import { AppDispatch } from '@/app/store';
import {
  fetchTotal,
  selectItemPayment,
  selectOpenPayment,
  selectTotalItemPayment,
  setOpenPayment,
} from '@/features/cart/cartSlice';
import { ReqCreateOrder } from '@/shared/types/authType';

type Props = {
  typePayment: 'one' | 'all';
};

type FormValuesProps = {
  userName: string;
  userNameCard: string;
  numberCard: string;
  dateCard: string;
  CVV: string;
  phoneNumber: string;
  address: string;
};

export const PaymentCart: React.FC<Props> = ({ typePayment }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const items = useAppSelector(selectItemPayment);
  const cartItems = useAppSelector((state) => state.cart.cart);

  const totalItemPayment = useAppSelector(selectTotalItemPayment);

  const PaymentSchema = Yup.object().shape({
    userName: Yup.string().required('Nhập tên'),
    userNameCard: Yup.string().required('Vui lòng nhập tên chủ thẻ'),
    numberCard: Yup.string()
      .required('Vui lòng nhập số thẻ')
      .matches(/^[0-9]+$/, 'Số thẻ không hợp lệ')
      .min(16, 'Số thẻ không hợp lệ')
      .max(16, 'Số thẻ không hợp lệ'),
    dateCard: Yup.string()
      .required('Vui lòng nhập hạn sử dụng')
      .test('valid-date', 'Hạn sử dụng không hợp lệ', function (value) {
        if (!value) return false;

        const [month, year] = value.split('/');
        if (!month || !year) return false;
        //check month between 1 and 12 and year between < current year get two last number
        const currentYear = new Date().getFullYear() % 100;
        if (Number(month) < 1 || Number(month) > 12) return false;
        if (Number(year) > currentYear) return false;
        return true;
      }),
    CVV: Yup.string()
      .required('Vui lòng nhập CVV')
      .matches(/^[0-9]+$/, 'CVV không hợp lệ')
      .min(3, 'CVV không hợp lệ')
      .max(3, 'CVV không hợp lệ'),
    phoneNumber: Yup.string()
      .required('Vui lòng nhập số điện thoại')
      .matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ')
      .min(10, 'Số điện thoại không hợp lệ')
      .max(10, 'Số điện thoại không hợp lệ'),
    address: Yup.string().required('Vui lòng nhập địa chỉ'),
  });

  const defaultValues: FormValuesProps = {
    userName: '',
    userNameCard: '',
    numberCard: '',
    dateCard: '',
    CVV: '',
    phoneNumber: '',
    address: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(PaymentSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  const onSubmit = async () => {
    const dataItemReq: ReqCreateOrder[] = [];
    if (typePayment === 'one') {
      dataItemReq.push({
        item_id: items[0].item.id,
        quantity: items[0].quantity,
      });

      try {
        const _ = await CmsApi.createOrder(dataItemReq);
        toast.success('Mua hàng thành công');
        dispatch(fetchTotal());
        dispatch(setOpenPayment(false));
      } catch (error) {
        if (error.response.status === 401) {
          toast.error('Vui lòng đăng nhập');
          router.push('/login');
        } else {
          toast.error('Mua hàng thất bại');
        }
      }
    } else {
      try {
        dataItemReq.push(
          ...cartItems.map((item) => ({
            item_id: item.item.id,
            quantity: item.quantity,
          }))
        );
        const _ = await CmsApi.createOrder(dataItemReq);
        toast.success('Mua hàng thành công');
        dispatch(fetchTotal());
        dispatch(setOpenPayment(false));
      } catch (error) {
        if (error.response.status === 401) {
          toast.error('Vui lòng đăng nhập');
          router.push('/login');
        } else {
          toast.error('Mua hàng thất bại');
        }
      }
    }
    reset();
  };

  const openPayment = useAppSelector(selectOpenPayment);
  const handleClose = () => dispatch(setOpenPayment(false));

  const style = {
    position: 'absolute' as const,
    top: '9%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 100,
  };
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Modal
      open={openPayment}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className=' flex items-center justify-center bg-teal-400 p-2 '>
            <div className='flex h-auto flex-col gap-2 rounded-lg bg-white p-4'>
              <div className='mt-3 text-center text-xl font-bold'>
                Chi tiết thanh toán
              </div>
              <div className='input_text relative mt-5'>
                {' '}
                <RHFTextField
                  name='userName'
                  type='text'
                  className='h-12 w-full border-b px-2 pl-7 outline-none transition-all focus:border-blue-900 '
                  placeholder='Nhập tên'
                />{' '}
                <span className='absolute left-0 -top-5 text-sm font-semibold'>
                  Tên người dùng
                </span>{' '}
                <i className='fa fa-user absolute left-2 top-4 text-gray-400'></i>{' '}
              </div>
              <div className='input_text relative mt-6'>
                <RHFTextField
                  name='phoneNumber'
                  type='text'
                  className='h-12 w-full border-b px-2 pl-7 outline-none transition-all focus:border-blue-900 '
                  placeholder='Số điện thoại'
                />
                <span className='absolute left-0 -top-5 text-sm font-semibold'>
                  Số điện thoại
                </span>
                <i className='fa fa-phone absolute left-2 top-4 text-gray-400'></i>
              </div>
              <div className='input_text relative mt-6'>
                <RHFTextField
                  name='address'
                  type='text'
                  className='h-12 w-full border-b px-2 pl-7 outline-none transition-all focus:border-blue-900 '
                  placeholder='Địa chỉ'
                />
                <span className='absolute left-0 -top-5 text-sm font-semibold'>
                  Nhập địa chỉ
                </span>
                <i className='fa fa-map-marker absolute left-2 top-4 text-gray-400'></i>
              </div>
              <div className='input_text relative mt-8'>
                {' '}
                <RHFTextField
                  name='userNameCard'
                  type='text'
                  className='h-12 w-full border-b px-2 pl-7 outline-none transition-all focus:border-blue-900 '
                  placeholder='Tên'
                />{' '}
                <span className='absolute left-0 -top-5 text-sm font-semibold'>
                  Tên chủ thẻ
                </span>{' '}
                <i className='fa fa-user absolute left-2 top-4 text-gray-400'></i>{' '}
              </div>
              <div className='input_text relative mt-6'>
                {' '}
                <RHFTextField
                  name='numberCard'
                  type='text'
                  className='h-12 w-full border-b p-2 outline-none transition-all focus:border-blue-900 '
                  placeholder='0000 0000 0000 0000'
                />{' '}
                <span className='absolute left-0 -top-5 text-sm font-semibold'>
                  Số thẻ
                </span>{' '}
                <i className='fa fa-credit-card absolute left-2 top-[14px] text-sm text-gray-400'></i>{' '}
              </div>
              <div className='mt-10 flex gap-5 '>
                <div className='input_text relative w-full'>
                  {' '}
                  <RHFTextField
                    name='dateCard'
                    type='text'
                    className=' border-b outline-none transition-all focus:border-blue-900 '
                    placeholder='mm/yyyy'
                  />{' '}
                  <span className='absolute left-0 -top-5 text-sm font-semibold'>
                    Hạn sử dụng
                  </span>{' '}
                  <i className='fa fa-calendar-o absolute left-2 top-4 text-gray-400'></i>{' '}
                </div>
                <div className='input_text relative w-full'>
                  {' '}
                  <RHFTextField
                    name='CVV'
                    type='text'
                    className='h-12 w-full border-b px-2 pl-7 outline-none transition-all focus:border-blue-900 '
                    placeholder='000'
                  />{' '}
                  <span className='absolute left-0 -top-4 text-sm font-semibold'>
                    CVV
                  </span>{' '}
                  <i className='fa fa-lock absolute left-2 top-4 text-gray-400'></i>{' '}
                </div>
              </div>
              {typePayment === 'one' && items[0]?.item ? (
                <div className='mt-5 flex justify-between text-lg font-bold '>
                  <p>Tổng tiền:</p>
                  <p>đ{items[0].item.price * items[0].quantity}</p>
                </div>
              ) : (
                <p className='mt-8 flex justify-between text-lg font-bold '>
                  <p>Tổng tiền:</p>
                  <p>đ{totalItemPayment}</p>
                </p>
              )}
              <div className='flex justify-center'>
                {' '}
                <Button
                  className='pay bordertransition-all h-12 w-full cursor-pointer outline-none'
                  style={{
                    backgroundColor: isHovered ? '#008B00' : 'limegreen',
                    color: 'white',
                    borderRadius: '8px',
                  }}
                  type='submit'
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Thanh toán
                </Button>{' '}
              </div>
            </div>
          </div>
        </FormProvider>
      </Box>
    </Modal>
  );
};
