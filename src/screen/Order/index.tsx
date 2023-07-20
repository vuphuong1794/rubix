import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';

import Layout from '@/components/layout/Layout';
import Skeleton from '@/components/Skeleton';

import { CmsApi } from '@/api/cms-api';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { ROUTES } from '@/constant';
import {
  addOrder,
  selectLoadingOrders,
  selectOrders,
  setLoadingOrders,
} from '@/features/products/productSlice';
import { OrderDetails } from '@/screen/Order/DetailOrder';
import { WithLayout } from '@/shared/types';

const Order: WithLayout = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const loading = useAppSelector(selectLoadingOrders);

  const session = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!session) {
      router.push(ROUTES.LOGIN);
    }
  }, [router, session]);

  React.useEffect(() => {
    async function fetchData() {
      dispatch(setLoadingOrders(true));
      try {
        const res = await CmsApi.getOrder();
        dispatch(addOrder(res.data.data));
        dispatch(setLoadingOrders(false));
      } catch (error) {
        router.push(ROUTES.LOGIN);
      }
    }
    fetchData();
  }, [dispatch, router]);

  return (
    <div className='mb-3 flex flex-col gap-2'>
      {loading && (
        <div>
          {Array(2)
            .fill(null)
            .map((_, index) => (
              <Skeleton
                key={index}
                className='flex h-full w-full flex-col gap-6'
              >
                <div className='h-80 bg-gray-200'></div>
                <div className='h-6 w-1/2 bg-gray-200'></div>
                <div className='h-6 w-full bg-gray-200'></div>
              </Skeleton>
            ))}
        </div>
      )}
      {orders.length > 0 &&
        !loading &&
        orders.map((order) => (
          <div key={order.id}>
            <OrderDetails orders={order} />
          </div>
        ))}
      {orders.length === 0 && !loading && (
        <div className='flex h-96 items-center justify-center'>
          <Image
            src='/svg/empty-cart.svg'
            width={300}
            height={300}
            alt='empty-cart'
          />
        </div>
      )}
    </div>
  );
};

Order.getLayout = (page) => <Layout>{page}</Layout>;
export default Order;
