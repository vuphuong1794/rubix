import { Avatar, Rating, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { CmsApi } from '@/api/cms-api';
import { formatTime } from '@/screen/Order/DetailOrder';
import { Review } from '@/shared/types/reviewType';

const CommentDetail = () => {
  const router = useRouter();

  const { id } = router.query;

  const [reviews, setReview] = React.useState<Review[]>([]);

  React.useEffect(() => {
    const fetchReview = async () => {
      const res = await CmsApi.getReview(id.toString());
      setReview(res.data.data);
    };

    fetchReview();
  }, [id]);

  return (
    <div className='flex w-full flex-col'>
      <span className='mb-4 font-bold'>ĐÁNH GIÁ SẢN PHẨM</span>
      <div className='mb-4 flex w-full flex-col gap-8'>
        {reviews.length > 0 &&
          reviews.map((review) => (
            <div
              className='flex w-full gap-2 md:ml-10 lg:ml-60'
              key={review.id}
            >
              <div>
                <Avatar alt='Avatar'>
                  {review.user.username.charAt(0).toUpperCase()}
                </Avatar>
              </div>
              <div className='flex flex-col gap-2'>
                <span>{review.user.username}</span>
                <Rating
                  name='read-only'
                  value={review.rating}
                  readOnly
                  size='small'
                />
                <Typography>
                  {formatTime(review.updated_at).time1.split('.')[0]}&nbsp;
                  {formatTime(review.created_at).date}
                </Typography>
                <span className='font-medium'>{review.content}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default CommentDetail;
