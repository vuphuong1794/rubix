import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useEffect, useState } from 'react';

import Auth from '@/components/Auth';
import { Button } from '@/components/common';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';

import { CmsApi } from '@/api/cms-api';
import ButtonCart from '@/screen/Cart/ButtonCart';
import { WithLayout } from '@/shared/types';
import { CartItem } from '@/shared/types/cartType';

const Cart: WithLayout = () => {
  const [data, setData] = useState<CartItem[]>([]);
  const session = useSession();
  console.log(session);

  const getCart = async () => {
    try {
      const res = await CmsApi.getCart();
      setData(res.data.data.cart_items);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  const handleDeleteItem = async (id: string) => {
    const item = [];
    item.push(id);
    try {
      const _ = await CmsApi.deleteCartItem(item);
    } catch (error) {
      console.log(error);
    }

    getCart();
  };

  return (
    <div className='mt-16 flex w-full flex-col items-center justify-center'>
      <h3 className='mb-6 flex w-full max-w-[70%] justify-start'>
        Shopping cart
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
          {data.map((item) => (
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
                  <p>${item.item.price}.00</p>
                  <p>{item.item.description}</p>
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
                    title='Remove'
                    onClick={() => handleDeleteItem(item.id)}
                    className='rounded-md border border-amber-400 p-2 outline-none transition-all hover:bg-amber-400 hover:text-white '
                  />
                </div>
              </td>
              <td>
                <h4>${item.item.price}.00</h4>
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
