import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import Auth from '@/components/Auth';
import { Button } from '@/components/common';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';

import { CmsApi } from '@/api/cms-api';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchTotal } from '@/features/cart/cartSlice';
import ButtonCart from '@/screen/Cart/ButtonCart';
import { WithLayout } from '@/shared/types';

const Cart: WithLayout = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cart);

  useEffect(() => {
    dispatch(fetchTotal());
  }, [dispatch]);

  const handleDeleteItem = async (id: string) => {
    try {
      const item = [id];
      await CmsApi.deleteCartItem(item);
      dispatch(fetchTotal());
      toast.success('Xóa sản phẩm thành công');
    } catch (error) {
      toast.error('Lỗi khi xóa sản phẩm');
    }
  };

  return (
    <div className='mt-16 flex w-full flex-col items-center justify-center'>
      <h3 className='mb-6 flex w-full max-w-[70%] justify-start'>
        Giỏ hàng của bạn
      </h3>
      <table className='flex w-full max-w-[70%] flex-col gap-6'>
        <thead>
          <tr className='flex w-full bg-[#f7f7f7] p-3 shadow-md'>
            <th className='w-[250px] text-center'>IMAGE</th>
            <th className='w-full text-center'>PRODUCT</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody className='mb-10 flex flex-col gap-6'>
          {cartItems.map((item) => (
            <tr
              key={item.id}
              className='flex w-full gap-6 border-b pb-6 last:border-none'
            >
              <td>
                <NextImage
                  width={200}
                  height={200}
                  src={item.item.images[0]}
                  alt=''
                  className='h-full bg-[#000]'
                />
              </td>
              <td className='flex w-full flex-col justify-between'>
                <div className='flex w-full flex-col gap-2'>
                  <h4>{item.item.name}</h4>
                  <p>₫{item.item.price}</p>
                  <p className='hidden lg:block'>{item.item.description}</p>
                </div>
                <div className='flex justify-between'>
                  <span>
                    <ButtonCart>
                      <RemoveIcon />
                    </ButtonCart>
                    <ButtonCart title={String(item.quantity)} />
                    <ButtonCart>
                      <AddIcon />
                    </ButtonCart>
                  </span>
                  <Button
                    title='Xóa'
                    onClick={() => handleDeleteItem(item.id)}
                    className='rounded-md border border-amber-400 p-2 outline-none transition-all hover:bg-amber-400 hover:text-white '
                  />
                </div>
              </td>
              <td>
                <h4>₫{item.item.price}</h4>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Cart.getLayout = (page) => (
  <Layout>
    <Auth>{page}</Auth>
  </Layout>
);

export default Cart;
