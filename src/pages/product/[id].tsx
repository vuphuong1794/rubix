import { requireAuth } from '@/components/requireAuth/Auth';

import { ProductDetail } from '@/screen';

export default ProductDetail;

export const getServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
