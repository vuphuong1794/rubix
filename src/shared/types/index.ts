import { ReactElement, ReactNode } from 'react';

export type WithLayout = {
  getLayout?: (page: ReactElement) => ReactNode;
};
