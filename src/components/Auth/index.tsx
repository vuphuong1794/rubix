import { signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

import { ERROR_TOKEN } from '@/constant';

const Auth: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === ERROR_TOKEN) {
      signOut();
    }
  });

  return <>{children}</>;
};

export default Auth;
