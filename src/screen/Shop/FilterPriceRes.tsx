import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { useAppDispatch } from '@/app/hooks';
import { setSubItemChoose } from '@/features/products/productSlice';
import { ReqSearchProduct } from '@/shared/types/itemType';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface ProductCategoriesProps {
  handleFilter: (params: ReqSearchProduct) => Promise<void>;
  minPrice: number;
  setMinPrice: SetState<number>;
  maxPrice: number;
  setMaxPrice: SetState<number>;
}

const FilterPriceRes: React.FC<ProductCategoriesProps> = ({
  handleFilter,
  maxPrice,
  minPrice,
  setMaxPrice,
  setMinPrice,
}) => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setSubItemChoose(id));
  }, [dispatch, id]);

  return (
    <div className='mt-12 border-b pb-10 lg:hidden'>
      <ul className='flex w-full gap-4'>
        <li className='flex w-56 cursor-pointer items-center gap-4'>
          <TextField
            sx={{ height: '100%' }}
            label='₫ TỪ'
            type='number'
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <TextField
            sx={{ height: '100%' }}
            label='₫ ĐẾN'
            type='number'
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </li>
        <li className='h-14 w-10'>
          <Button
            sx={{ height: '100%' }}
            style={{
              width: '100%',
              backgroundColor: '#F59E0B',
              fontWeight: 'bold',
              color: 'white',
              transition: 'background-color 0.2s',
            }}
            variant='outlined'
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
export default FilterPriceRes;
