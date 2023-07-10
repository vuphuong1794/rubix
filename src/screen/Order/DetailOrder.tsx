import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import StoreIcon from '@mui/icons-material/Store';
import { Divider, Popover, Typography } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';

import { CmsApi } from '@/api/cms-api';
import { useAppDispatch } from '@/app/hooks';
import { addOrder, setLoadingOrders } from '@/features/products/productSlice';
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

  const dispatch = useAppDispatch();

  const handleCancelOrder = async (id: string) => {
    try {
      await CmsApi.cancelOrder({ order_id: id });
      toast.success('Hủy đơn hàng thành công');
      dispatch(setLoadingOrders(true));
      const res = await CmsApi.getOrder();
      dispatch(addOrder(res.data.data));
      dispatch(setLoadingOrders(false));
    } catch (error) {
      toast.error('Có lỗi xảy ra');
    }
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
        <div className='flex gap-1'>
          {orders.status === 'pending' && (
            <div className='flex flex-col gap-1 text-[#88b59c]'>
              <div
                onClick={() => {
                  handleCancelOrder(orders.id);
                }}
              >
                <span className='mr-3 h-8 w-11 cursor-pointer border bg-red-500 p-1 text-white'>
                  Hủy
                </span>
                <LocalShippingIcon />
                {OrderStatus[orders.status]}
              </div>
            </div>
          )}
          {orders.status === 'cancelled' && (
            <span className='ml-1 h-8 w-16 border bg-red-500 p-1'>Đã hủy</span>
          )}
          <QuestionMarkIcon className='mt-[3px] h-5 w-5 cursor-pointer rounded-xl border border-dark text-black' />
          <div
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup='true'
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
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
        <OrderItemDetails status={orders.status} key={item.id} item={item} />
      ))}
    </div>
  );
};
export const formatTime = (time: string) => {
  const [date, time1] = time.split('T');

  return { date, time1 };
};
