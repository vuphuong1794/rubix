import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import NextImage from '@/components/NextImage';

import { CmsApi } from '@/api/cms-api';
import { useAppDispatch } from '@/app/hooks';
import { fetchTotal } from '@/features/cart/cartSlice';
import { getValueImage } from '@/features/products/productSlice';
import { ReqCartItem } from '@/shared/types/cartType';
import { Product } from '@/shared/types/productType';

const ProductItem = ({ item }: { item: Product }) => {
  const [isHover, setIsHover] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddToCart = async ({ itemId, quantity }: ReqCartItem) => {
    const items: ReqCartItem[] = [];
    items.push({ itemId, quantity });

    try {
      const _ = await CmsApi.addToCart(items);
      dispatch(fetchTotal());
      toast.success('Thêm vào giỏ hàng thành công');
    } catch (error) {
      toast.error('Thêm vào giỏ hàng thất bại');
    }
  };

  return (
    <div
      className='relative cursor-pointer'
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <div>
        <NextImage
          className='relative h-full w-full'
          width={500}
          height={500}
          src={isHover ? item.images[0] : item.images[1] || item.images[0]}
          alt=''
        />
        {isHover && (
          <div className='absolute right-4 top-4 flex flex-col gap-2'>
            <span
              onClick={() => handleAddToCart({ itemId: item.id, quantity: 1 })}
              className='flex h-8 w-8 items-center justify-center rounded-md bg-white transition-all hover:bg-amber-400 hover:text-white xl:h-12 xl:w-12'
            >
              <LocalMallOutlinedIcon />
            </span>
          </div>
        )}
        {item.price && (
          <span className='absolute top-4 left-4 z-10 flex h-8 w-14 items-center justify-center rounded-sm bg-amber-400 px-3 py-4 text-sm font-bold text-white'>
            Sale
          </span>
        )}
      </div>

      <div className='mt-2'>
        <h4 className='font-medium transition-all hover:text-amber-400'>
          {item.name}
        </h4>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2'>
            <span
              className={`${
                item.price ? 'line-through' : null
              } text-base font-light text-gray-700`}
            >
              ₫{item.cost}
            </span>
            {item.price && (
              <span className='text-base font-light text-amber-400'>
                ₫{item.price}
              </span>
            )}
          </div>

          <div className='flex h-full w-full justify-end gap-1'>
            {item.images?.map((image) => (
              <span
                key={image}
                onMouseEnter={() => {
                  setIsHover(true);
                  dispatch(getValueImage(image));
                }}
                onMouseLeave={() => {
                  setIsHover(false);
                  dispatch(getValueImage(image));
                }}
                className='h-4 w-4 rounded-full'
              >
                <NextImage
                  className='h-full w-full'
                  width={15}
                  height={15}
                  src={image}
                  alt=''
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
