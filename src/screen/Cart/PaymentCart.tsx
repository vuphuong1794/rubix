import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Modal } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
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
  userNameCard: string;
  numberCard: string;
  dateCard: string;
  CVV: string;
};

export const PaymentCart: React.FC<Props> = ({ typePayment }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const items = useAppSelector(selectItemPayment);
  const cartItems = useAppSelector((state) => state.cart.cart);

  const totalItemPayment = useAppSelector(selectTotalItemPayment);

  const PaymentSchema = Yup.object().shape({
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
  });

  const defaultValues: FormValuesProps = {
    userNameCard: '',
    numberCard: '',
    dateCard: '',
    CVV: '',
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
  console.log('🚀 ~ totalItemPayment:', totalItemPayment);

  const openPayment = useAppSelector(selectOpenPayment);
  const handleClose = () => dispatch(setOpenPayment(false));

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={openPayment}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center justify-center bg-blue-300 p-2'>
            <div className='flex h-auto flex-col gap-2 rounded-lg bg-white p-3'>
              <p className='text-xl font-semibold'>Chi tiết thanh toán</p>
              <div className='input_text relative mt-6'>
                {' '}
                <RHFTextField
                  name='userNameCard'
                  type='text'
                  className='h-12 w-full border-b px-2 pl-7 outline-none transition-all focus:border-blue-900 '
                  placeholder='Tên'
                />{' '}
                <span className='absolute left-0 -top-5 text-sm'>
                  Tên chủ thẻ
                </span>{' '}
                <i className='fa fa-user absolute left-2 top-4 text-gray-400'></i>{' '}
              </div>
              <div className='input_text relative mt-8'>
                {' '}
                <RHFTextField
                  name='numberCard'
                  type='text'
                  className='h-12 w-full border-b px-2 pl-7 outline-none transition-all focus:border-blue-900 '
                  placeholder='0000 0000 0000 0000'
                />{' '}
                <span className='absolute left-0 -top-5 text-sm'>Số thẻ</span>{' '}
                <i className='fa fa-credit-card absolute left-2 top-[14px] text-sm text-gray-400'></i>{' '}
              </div>
              <div className='mt-8 flex gap-5 '>
                <div className='input_text relative w-full'>
                  {' '}
                  <RHFTextField
                    name='dateCard'
                    type='text'
                    className='h-12 w-full border-b px-2 pl-7 outline-none transition-all focus:border-blue-900 '
                    placeholder='mm/yyyy'
                  />{' '}
                  <span className='absolute left-0 -top-5 text-sm'>
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
                  <span className='absolute left-0 -top-4 text-sm'>CVV</span>{' '}
                  <i className='fa fa-lock absolute left-2 top-4 text-gray-400'></i>{' '}
                </div>
              </div>
              {typePayment === 'one' && items[0]?.item ? (
                <p className='mt-10 text-center text-lg font-semibold text-gray-600'>
                  Tổng tiền: đ{items[0].item.price * items[0].quantity}
                </p>
              ) : (
                <p className='mt-10 text-center text-lg font-semibold text-gray-600'>
                  Tổng tiền: đ{totalItemPayment}
                </p>
              )}
              <div className='mt-2 flex justify-center'>
                {' '}
                <Button
                  className='pay mb-3 h-12 w-1/2 cursor-pointer rounded-lg bg-orange-600 text-white outline-none transition-all hover:bg-orange-700'
                  type='submit'
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
