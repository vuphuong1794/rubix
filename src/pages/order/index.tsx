import { requireAuth } from '@/components/requireAuth/Auth';

import { Order } from '@/screen';

export default Order;

export const getServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
