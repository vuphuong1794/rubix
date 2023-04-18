import { requireAuth } from '@/components/requireAuth/Auth';

import { Home } from '@/screen';

export default Home;

export const getServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
