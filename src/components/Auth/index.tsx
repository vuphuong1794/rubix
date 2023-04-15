import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { ERROR_TOKEN } from '@/constant';

interface Props {
  children: React.ReactNode;
}
const Auth = ({ children }: Props) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }

    if (session?.user.error === ERROR_TOKEN) {
      signOut();
    }
  }, [session]);
  return <>{children}</>;
};

export default Auth;
