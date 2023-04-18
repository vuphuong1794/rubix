import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import BgBanner from '@/components/common/BgBanner';
import Layout from '@/components/layout/Layout';
import ProductItem from '@/components/Products/ProductItem';
import Skeleton from '@/components/Skeleton';

import { CmsApi } from '@/api/cms-api';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectSubItemChoose,
  selectSubPriceChoose,
  setSubItemChoose,
  setSubPriceChoose,
} from '@/features/products/productSlice';
import { WithLayout } from '@/shared/types';
import { Category } from '@/shared/types/categories';
import { ReqSearchProduct } from '@/shared/types/itemType';
import { Product } from '@/shared/types/productType';

import {
  BestSeller,
  ButtonPage,
  SubColorItem,
  SubItem,
  SubPriceItem,
} from './SubItem';

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

const COUNT_PAGES_SHOW = 5;

const Collections: WithLayout = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [sort, setSort] = React.useState('');
  const getSubPriceChoose = useAppSelector(selectSubPriceChoose);
  const [product, setProduct] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [itemCount, setItemCount] = useState<number | null>(null);
  const [take, setTake] = useState<number>(12);
  const [isHover, setIsHover] = useState(false);
  const [itemChoose, setItemChoose] = useState(false);

  const getSubItemChoose = useAppSelector(selectSubItemChoose);
  const dispatch = useAppDispatch();

  const handleHover = () => {
    setIsHover(!isHover);
  };

  useEffect(() => {
    setItemChoose(getSubItemChoose === 'All Categories');
  }, [getSubItemChoose]);

  const minPageShow =
    page - Math.floor(COUNT_PAGES_SHOW / 2) > 1
      ? page - Math.floor(COUNT_PAGES_SHOW / 2)
      : 1;

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  const handlePrevPage = () => {
    if (prevPage) {
      handleSort({ page: page - 1, take: 12 });
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      handleSort({ page: page + 1, take: 12 });
    }
  };

  const handleSort = async ({ page, take, cates_slug }: ReqSearchProduct) => {
    setIsLoading(false);
    try {
      const dataCat = await CmsApi.getCategories();
      setCategories(dataCat.data.data);

      const res = await CmsApi.getProducts({ page, take, cates_slug });
      setProduct(res.data.data);
      setPageCount(res.data.meta.pageCount);
      setPrevPage(res.data.meta.hasPreviousPage);
      setNextPage(res.data.meta.hasNextPage);
      setItemCount(res.data.meta.itemCount);
      setTake(res.data.meta.take);
      setPage(res.data.meta.page);
      setIsLoading(true);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    handleSort({ page: page, take: 12 });
  }, []);

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <BgBanner nav='Products' />
      <div className='my-20 grid w-full max-w-[90%] grid-cols-5 gap-6 2xl:max-w-[80%]'>
        <div className='hidden w-full lg:block'>
          <div className='border-b pb-10'>
            <h4 className='mb-10'>Product Categories</h4>
            <ul className='flex w-full flex-col gap-4 '>
              <li
                onClick={() => {
                  handleSort({ page: 1, take: 12 });
                  dispatch(setSubItemChoose('All Categories'));
                }}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                className='flex w-full cursor-pointer items-center gap-4'
              >
                <span
                  className={`${
                    isHover || itemChoose ? 'border-black bg-black' : 'bg-white'
                  } flex h-4 w-4 items-center justify-center rounded-full border transition-all hover:border-black hover:bg-black`}
                >
                  {isHover || itemChoose ? (
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
                  All Categories
                </Link>
              </li>
              {categories.map((item) => (
                <SubItem key={item.id} item={item} handleSort={handleSort} />
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
          {isLoading ? (
            <div className='grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4'>
              {product.map((item) => (
                <ProductItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div>
              <div className='grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4'>
                {Array(12)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      className='flex h-full w-full flex-col gap-6'
                    >
                      <div className='h-80 bg-gray-200'></div>
                      <div className='h-6 w-1/2 bg-gray-200'></div>
                      <div className='h-6 w-full bg-gray-200'></div>
                    </Skeleton>
                  ))}
              </div>
            </div>
          )}

          {error && <span>{error}</span>}
          <div className='flex items-center justify-between pt-16 text-gray-700'>
            <div className='flex gap-2'>
              <ButtonPage onClick={handlePrevPage}>
                <KeyboardDoubleArrowLeftIcon />
              </ButtonPage>
              {Array(pageCount > 2 ? COUNT_PAGES_SHOW : pageCount)
                .fill(null)
                .map((_, index) => (
                  <ButtonPage
                    key={index}
                    className={`${
                      page === index + minPageShow
                        ? 'bg-amber-400 text-white'
                        : 'bg-white'
                    }`}
                    title={String(index + minPageShow)}
                    onClick={() =>
                      handleSort({ page: index + minPageShow, take: 12 })
                    }
                  />
                ))}
              <ButtonPage onClick={handleNextPage}>
                <KeyboardDoubleArrowRightIcon />
              </ButtonPage>
            </div>
            <span>
              Showing {prevPage ? page * take - 11 : 1}-
              {nextPage ? take * page : itemCount} of {itemCount}
              Results
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Collections.getLayout = (page) => <Layout>{page}</Layout>;

export default Collections;
