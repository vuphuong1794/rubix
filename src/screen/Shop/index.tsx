import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';

import { product } from '@/data';

import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import ProductItem from '@/components/Products/ProductItem';

import { WithLayout } from '@/shared/types';

import { SubColorItem, SubItem } from './SubItem';
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

const Shop: WithLayout = () => {
  const [sort, setSort] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <NextImage
        width={2000}
        height={1000}
        className='h-full w-full scale-100'
        src='https://cdn.shopify.com/s/files/1/0376/9440/6700/files/bg-breacumb.jpg?v=1613729001'
        alt=''
      />
      <div className='mt-20 grid w-full max-w-[80%] grid-cols-5 gap-6'>
        <div className='w-full'>
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
        </div>
        <div className='col-span-4'>
          <div className='mb-6 flex items-center justify-between'>
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
          <div className='grid grid-cols-4 gap-6'>
            {product.map((item) => (
              <ProductItem key={item.product_name} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Shop.getLayout = (page: any) => <Layout>{page}</Layout>;

export default Shop;
