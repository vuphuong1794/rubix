import { FC } from 'react';

import { ISwiper } from '@/data';

import NextImage from '@/components/NextImage';

const ItemSwiper: FC<ISwiper> = (item) => {
  return (
    <div className='w-full'>
      <NextImage
        className='h-full w-full'
        width={2000}
        height={1000}
        src={item.image}
        alt=''
      />
    </div>
  );
};

export default ItemSwiper;
