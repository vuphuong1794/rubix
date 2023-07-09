import { Box, Divider, Modal, Rating, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { toast } from 'react-toastify';

import { CmsApi } from '@/api/cms-api';
import { OrderItem } from '@/shared/types/orderType';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = {
  item: OrderItem;
  setIsReviewed: React.Dispatch<React.SetStateAction<boolean>>;
};

const PoperFeedbackOrder = ({ item, setIsReviewed }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState<number | null>(0);
  const [input, setInput] = React.useState<string>('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFeedback = () => {
    try {
      CmsApi.createReview({
        content: input,
        rating: rating,
        item_id: item.item.id,
        order_item_id: item.id,
      });
      toast.success('Đánh giá thành công');
      setIsReviewed(true);
    } catch (error) {
      toast.error('Đã có lỗi xảy ra');
    }
    handleClose();
  };
  return (
    <div>
      <div>
        <span
          onClick={handleOpen}
          className='ml-1 cursor-pointer border border-yellow-300 p-1'
        >
          Đánh giá
        </span>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <div>
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
                  {item.item.cost < item.item.price && (
                    <div className='text-[#88b59c] line-through'>
                      {item.item.cost.toLocaleString()}đ
                    </div>
                  )}
                  <div className='font-bold text-red-500'>
                    {item.item.price.toLocaleString()}đ
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='font-bold text-red-500'>
                  Tổng tiền: {item.price * item.quantity}đ
                </div>
              </div>
              <Divider className='my-1' />
            </div>
            <div className='flex w-full flex-col items-center justify-center'>
              <Typography>Bạn có hài lòng với sản phẩm</Typography>
              <Rating
                name='simple-controlled'
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
              <textarea
                id='first_name'
                className='mt-2 block h-28 w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                placeholder='Để lại nhận xét của bạn nhé'
                required
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                }}
              />
            </div>
            <div>
              <button
                onClick={handleFeedback}
                className='mt-2 ml-1 rounded-lg bg-[#88b59c] px-2 py-1 text-white'
              >
                Gửi đánh giá
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
export default PoperFeedbackOrder;
