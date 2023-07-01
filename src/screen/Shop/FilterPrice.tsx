import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectSubPriceChoose,
  setSubItemChoose,
  setSubPriceChoose,
} from '@/features/products/productSlice';
import { ReqSearchProduct } from '@/shared/types/itemType';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface ProductCategoriesProps {
  handleFilter: (params: ReqSearchProduct) => Promise<void>;
  minPrice: number;
  setMinPrice: SetState<number>;
  maxPrice: number;
  setMaxPrice: SetState<number>;
}

const FilterPrice: React.FC<ProductCategoriesProps> = ({
  handleFilter,
  maxPrice,
  minPrice,
  setMaxPrice,
  setMinPrice,
}) => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();
  const getSubPriceChoose = useAppSelector(selectSubPriceChoose);

  React.useEffect(() => {
    dispatch(setSubItemChoose(id));
  }, [dispatch, id]);

  return (
    <div className='mt-12 w-full border-b pb-10'>
      <div className='flex h-full w-full justify-between'>
        <h4 className='mb-6'>Giá</h4>
        {getSubPriceChoose === '' ? null : (
          <span
            className='cursor-pointer text-amber-400'
            onClick={() => dispatch(setSubPriceChoose(''))}
          >
            <HighlightOffIcon />
          </span>
        )}
      </div>
      <ul className='flex w-full flex-col gap-4'>
        <li className='flex w-full cursor-pointer items-center gap-4'>
          <TextField
            label='₫ TỪ'
            type='number'
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <TextField
            label='₫ ĐẾN'
            type='number'
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </li>
        <li className='w-full'>
          <Button
            variant='outlined'
            className='w-full'
            onClick={() =>
              handleFilter({
                page: 1,
                take: 12,
                cates_slug: 'all',
                start_price: minPrice,
                end_price: maxPrice,
              } as ReqSearchProduct)
            }
          >
            Lọc
          </Button>
        </li>
      </ul>
    </div>
  );
};
export default FilterPrice;
