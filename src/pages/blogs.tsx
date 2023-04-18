import { requireAuth } from '@/components/requireAuth/Auth';

import { Blogs } from '@/screen';

export default Blogs;

export const getServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
