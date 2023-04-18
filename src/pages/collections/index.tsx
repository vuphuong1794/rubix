import { requireAuth } from '@/components/requireAuth/Auth';

import { Collections } from '@/screen';

export default Collections;

export const getServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
