import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from 'react';

import BgBanner from '@/components/common/BgBanner';
import Layout from '@/components/layout/Layout';
import ProductItem from '@/components/Products/ProductItem';

import { CmsApi } from '@/api/cms-api';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectSubPriceChoose,
  setSubPriceChoose,
} from '@/features/products/productSlice';
import { WithLayout } from '@/shared/types';
import { ReqSearch } from '@/shared/types/itemType';
import { Product } from '@/shared/types/productType';

import {
  BestSeller,
  ButtonPage,
  SubColorItem,
  SubItem,
  SubPriceItem,
} from './SubItem';
const categories: string[] = [
  'All Categories',
  'Furniture',
  'Chairs',
  'Sofas',
  'Lighting Lamp',
  'Decor Art',
];

const colors: string[] = [
  'bg-[#000]',
  'bg-[#00f]',
  'bg-[#7e7d7d]',
  'bg-[#fff]',
  'bg-[#f9b61e]',
];
const price: string[] = [
  '$0 - $50',
  '$50 - $100',
  '$150 - $200',
  '$200 - $250',
];

const Shop: WithLayout = () => {
  const [sort, setSort] = React.useState('');
  const getSubPriceChoose = useAppSelector(selectSubPriceChoose);
  const [product, setProduct] = useState<Product[]>([]);

  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  useEffect(() => {
    const handleSort = async ({ page, take }: ReqSearch) => {
      try {
        const res = await CmsApi.getProduct({ page, take });
        console.log(res.data.data);
        setProduct(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleSort({ page: 1, take: 10 });
  }, [sort]);

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <BgBanner nav='Products' />
      <div className='my-20 grid w-full max-w-[90%] grid-cols-5 gap-6 2xl:max-w-[80%]'>
        <div className='hidden w-full lg:block'>
          <div className='border-b pb-10'>
            <h4 className='mb-10'>Product Categories</h4>
            <ul className='flex w-full flex-col gap-4 '>
              {categories.map((item) => (
                <SubItem key={item} item={item} />
              ))}
            </ul>
          </div>
          <div className='border-b pb-10 pt-14'>
            <h4 className='mb-6'>Color</h4>
            <ul className='flex'>
              {colors.map((item) => (
                <SubColorItem key={item} item={item} />
              ))}
            </ul>
          </div>
          <div className='mt-12 w-full border-b pb-10'>
            <div className='flex h-full w-full justify-between'>
              <h4 className='mb-6'>Price</h4>
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
              {price.map((item) => (
                <SubPriceItem key={item} item={item} />
              ))}
            </ul>
          </div>
          <div>
            <h4 className='mt-12 mb-8'>Best sellers</h4>
            <div className='flex flex-col gap-6'>
              {product.slice(0, 4).map((item) => (
                <BestSeller key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
        <div className='col-span-5 lg:col-span-4'>
          <div className='mb-6 flex w-full items-center justify-between'>
            <span className='flex gap-2'>
              <GridViewIcon className=' cursor-pointer' />
              <FormatListBulletedIcon className=' cursor-pointer' />
            </span>
            {/* FIXME: Fix select style */}
            <FormControl
              size='small'
              sx={{
                m: 1,
                width: 160,
                height: 40,
                backgroundColor: '#f5f5f5',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'evenly',
              }}
            >
              <Select
                style={{
                  backgroundColor: '#f5f5f5',
                  height: 40,
                  width: 160,
                  padding: '0 8px',
                }}
                disableUnderline={true}
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={sort}
                onChange={handleChange}
                variant='standard'
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className='grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4'>
            {product.map((item) => (
              <ProductItem key={item.id} item={item} />
            ))}
          </div>
          <div className='flex items-center justify-between pt-16 text-gray-700'>
            <div className='flex gap-2'>
              <ButtonPage>
                <KeyboardDoubleArrowLeftIcon />
              </ButtonPage>
              <ButtonPage title='1' />
              <ButtonPage title='2' />
              <ButtonPage>
                <KeyboardDoubleArrowRightIcon />
              </ButtonPage>
            </div>
            <span>Showing 1-12 of 17 Results</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Shop.getLayout = (page: any) => <Layout>{page}</Layout>;

export default Shop;
