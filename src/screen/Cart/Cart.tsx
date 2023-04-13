import { useSession } from 'next-auth/react';
import React from 'react';
import { useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';

import { CmsApi } from '@/api/cms-api';
import { WithLayout } from '@/shared/types';
import { CartItem } from '@/shared/types/cartType';

const Cart: WithLayout = () => {
  const [data, setData] = useState<CartItem[]>([]);
  const session = useSession();
  console.log(session);

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await CmsApi.getCart();
        setData(res.data.data.cart_items);
      } catch (error) {
        console.log(error);
      }
    };
    getCart();
  }, []);

  return (
    <div>
      <h2>Shopping cart</h2>
      <table>
        <thead>
          <tr>
            <th>IMAGE</th>
            <th>PRODUCT</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <NextImage
                  width={200}
                  height={200}
                  src={item.item.images[0]}
                  alt=''
                  className='h-full w-full bg-[#000]'
                />
              </td>
              <td>
                <h4>Product name</h4>
                <p>Product description</p>
                <p>Product price</p>
              </td>
              <td>
                <h3>Price</h3>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Cart.getLayout = (page) => <Layout>{page}</Layout>;

export default Cart;
