import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';

import Layout from '@/components/layout/Layout';

import { CmsApi } from '@/api/cms-api';
import { ROUTES } from '@/constant';
import { OrderDetails } from '@/screen/Order/DetailOrder';
import { WithLayout } from '@/shared/types';
import { OrderData } from '@/shared/types/orderType';

const Order: WithLayout = () => {
  const [orders, setOrder] = React.useState<OrderData[]>([]);

  const session = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!session) {
      router.push(ROUTES.LOGIN);
    }
  }, [router, session]);

  React.useEffect(() => {
    async function fetchData() {
      const res = await CmsApi.getOrder();
      setOrder(res.data.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {orders.length > 0 &&
        orders.map((order) => (
          <div key={order.id}>
            <OrderDetails orders={order} />
          </div>
        ))}
    </div>
  );
};

Order.getLayout = (page) => <Layout>{page}</Layout>;
export default Order;
