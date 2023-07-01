import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { useAppDispatch } from '@/app/hooks';
import { setSubItemChoose } from '@/features/products/productSlice';
import { Category } from '@/shared/types/categories';
import { ReqSearchProduct } from '@/shared/types/itemType';

import { SubItem } from './SubItem';

interface ProductCategoriesProps {
  categories: Category[];
  handleSort: (params: ReqSearchProduct) => Promise<void>;
}

const FilterCategories: React.FC<ProductCategoriesProps> = ({
  categories,
  handleSort,
}) => {
  const [isHover, setIsHover] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;

  const handleHover = () => {
    setIsHover(!isHover);
  };

  const handleAllCategoriesClick = () => {
    handleSort({ page: 1, take: 12 });
    dispatch(setSubItemChoose('All Categories'));
  };

  return (
    <div className='relative border-b pb-10'>
      <h4 className='absolute -top-14 mb-10'>Danh mục sản phẩm</h4>
      <ul className='flex w-full flex-col gap-4 '>
        <li
          onClick={handleAllCategoriesClick}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          className='flex w-full cursor-pointer items-center gap-4'
        >
          <span
            className={`${
              isHover || id === 'all' ? 'border-black bg-black' : 'bg-white'
            } flex h-4 w-4 items-center justify-center rounded-full border transition-all hover:border-black hover:bg-black`}
          >
            {isHover || id === 'all' ? (
              <span className='flex items-center justify-center text-white transition-all'>
                <KeyboardArrowRightIcon
                  style={{ width: '16px', height: '16px' }}
                />
              </span>
            ) : null}
          </span>
          <Link
            href='/collections/all'
            onClick={() => {
              handleSort({ page: 1, take: 12 });
            }}
          >
            Tất cả sản phẩm
          </Link>
        </li>
        {categories.map((item) => (
          <SubItem key={item.id} item={item} handleSort={handleSort} />
        ))}
      </ul>
    </div>
  );
};

export default FilterCategories;
