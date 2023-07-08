import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import StoreIcon from '@mui/icons-material/Store';
import { Divider, Popover, Typography } from '@mui/material';
import React from 'react';

import OrderItemDetails from '@/screen/Order/OrderItemDetails';
import { OrderData, OrderStatus } from '@/shared/types/orderType';

type OrderDetailProps = {
  orders: OrderData;
};

export const OrderDetails = ({ orders }: OrderDetailProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div className='mx-2 bg-slate-50 p-2 lg:mx-60'>
      <div className=' flex justify-between gap-1'>
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <StoreIcon />
            <span className='font-bold'>Cửa hàng Rubix</span>
          </div>
          <div className='flex'>
            <span className='font-extrabold '>
              Tổng tiền đơn hàng:&nbsp;
              <span className='text-red-500'>
                {orders.total_price.toLocaleString()}đ
              </span>
            </span>
          </div>
        </div>
        <div className='flex gap-1 text-[#88b59c]'>
          <LocalShippingIcon />
          {OrderStatus[orders.status]}
          <div
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup='true'
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <QuestionMarkIcon className='h-5 w-5 cursor-pointer rounded-xl border border-dark text-black' />
          </div>
          <Popover
            id='mouse-over-popover'
            sx={{
              pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>Cập nhật mới nhất</Typography>
            <Typography sx={{ p: 1 }}>
              {formatTime(orders.updated_at).time1.split('.')[0]}&nbsp;
              {formatTime(orders.created_at).date}
            </Typography>
          </Popover>
        </div>
      </div>
      <div className='w-full'>
        <Divider
          sx={{
            color: 'yellow',
          }}
          orientation='horizontal'
          flexItem
        />
      </div>
      {orders.orderItems.map((item) => (
        <OrderItemDetails key={item.id} item={item} />
      ))}
    </div>
  );
};
export const formatTime = (time: string) => {
  const [date, time1] = time.split('T');

  return { date, time1 };
};
