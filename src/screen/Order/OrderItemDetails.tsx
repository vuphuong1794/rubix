import Image from 'next/image';
import React from 'react';

import { OrderItem } from '@/shared/types/orderType';

type Props = {
  status: string;
  item: OrderItem;
};

const OrderItemDetails = ({ item, status }: Props) => {
  return (
    <div
      className='my-2'
      onClick={() => {
        alert(status);
      }}
    >
      <div className='flex items-center justify-between'>
        <div className='flex gap-2'>
          <Image
            src={item.item.images[0]}
            alt='Picture of the author'
            width={100}
            height={100}
          />
          <div>
            <div className='font-bold'>{item.item.name}</div>
            <div className='text-[#88b59c]'>x{item.quantity}</div>
          </div>
        </div>
        <div className='flex gap-1'>
          <div className='text-[#88b59c] line-through'>
            {item.item.cost.toLocaleString()}đ
          </div>
          <div className='font-bold text-red-500'>
            {item.item.price.toLocaleString()}đ
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <div className='font-bold text-red-500'>
          Tổng tiền: {item.price * item.quantity}đ
        </div>
        <div>
          {status === 'completed' && (
            <span className='ml-1 cursor-pointer border border-yellow-300 p-1'>
              Đánh giá
            </span>
          )}
          {status === 'cancelled' && (
            <span className='ml-1 cursor-pointer border bg-red-500 p-1'>
              Đã hủy
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItemDetails;
