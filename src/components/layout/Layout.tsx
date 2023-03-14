import * as React from 'react';
import ScrollToTop from 'react-scroll-to-top';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div>
      <Header />
      {children}
      <ScrollToTop
        className='flex cursor-pointer items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:bg-amber-400 hover:text-white'
        smooth
        svgPath='M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z'
        viewBox='0 0 24 24'
      />
      <Footer />
    </div>
  );
}
