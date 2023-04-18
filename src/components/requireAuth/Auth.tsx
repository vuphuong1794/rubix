import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export function requireAuth(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    return await gssp(ctx);
  };
}
