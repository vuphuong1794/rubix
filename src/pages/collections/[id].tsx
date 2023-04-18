import { requireAuth } from '@/components/requireAuth/Auth';

import { Shop } from '@/screen';

export default Shop;

export const getServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
