import { requireAuth } from '@/components/requireAuth/Auth';

import { Cart } from '@/screen';

export default Cart;

export const getServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
