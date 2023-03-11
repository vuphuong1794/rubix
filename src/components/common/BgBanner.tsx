import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React, { FC } from 'react';

import NextImage from '@/components/NextImage';

interface PropsBgBanner {
  nav: string;
}

const BgBanner: FC<PropsBgBanner> = (props) => {
  return (
    <div className='relative'>
      <NextImage
        width={2000}
        height={1000}
        className='h-full w-full scale-100'
        src='https://cdn.shopify.com/s/files/1/0376/9440/6700/files/bg-breacumb.jpg?v=1613729001'
        alt=''
      />
      <div className='absolute top-1/2 left-[5%] -translate-y-1/2 2xl:left-[10%]'>
        <h1 className='mb-6 text-5xl font-bold'>{props.nav}</h1>
        <div className='flex items-center gap-2 text-sm text-gray-700'>
          <span>Home</span>
          <KeyboardArrowRightIcon style={{ fontSize: '18px' }} />
          <span className='text-gray-400'>{props.nav}</span>
        </div>
      </div>
    </div>
  );
};

export default BgBanner;
