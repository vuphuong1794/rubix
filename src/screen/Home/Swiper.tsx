import Link from 'next/link';
import { FC } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';

import { ISwiper } from '@/data';

import NextImage from '@/components/NextImage';

const ItemSwiper: FC<ISwiper> = (item) => {
  return (
    <div className='swiper-slide-active relative h-full w-full animate-opacity'>
      <NextImage
        className='h-full w-full sm:opacity-40 lg:opacity-100'
        width={2000}
        height={900}
        src={item.image}
        alt=''
      />
      <div className='absolute top-1/2 hidden -translate-y-1/2 md:left-[20%] md:block lg:left-[40%] xl:left-[45%] 2xl:left-[1/2]'>
        <div className='mb-5 flex lg:mb-10'>
          <h3 className='pr-2'>Quick parcel delivery,</h3>
          <h3 className='text-amber-400'>from $25</h3>
        </div>
        <h1 className='slider-label mb-2 animate-arrow-left text-4xl font-medium xl:text-5xl 2xl:text-6xl'>
          {item.content}
        </h1>
        <h1 className='slider-detail mb-3 animate-arrow-right text-4xl font-medium  lg:mb-16 xl:text-5xl 2xl:text-6xl'>
          {item.br}
        </h1>
        <Link
          href='/collections/all'
          className='slider-button absolute mb-14 flex animate-arrow-top items-center justify-center gap-2 rounded-md  bg-black py-[14px] px-8 text-white transition-all hover:bg-amber-400 lg:mb-0'
        >
          <span className='mb-1 font-semibold'>Bắt đầu mua hàng</span>
          <MdArrowForwardIos />
        </Link>
      </div>
    </div>
  );
};

export default ItemSwiper;
