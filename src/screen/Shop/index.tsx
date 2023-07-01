import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import BgBanner from '@/components/common/BgBanner';
import Layout from '@/components/layout/Layout';
import ProductItem from '@/components/Products/ProductItem';
import Skeleton from '@/components/Skeleton';

import { CmsApi } from '@/api/cms-api';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectProducts,
  setProducts,
  setSubItemChoose,
} from '@/features/products/productSlice';
import FilterCategories from '@/screen/Shop/FilterCategories';
import FilterPrice from '@/screen/Shop/FilterPrice';
import FilterPriceRes from '@/screen/Shop/FilterPriceRes';
import PoperFilterCategories from '@/screen/Shop/PoperFilterCategories';
import { WithLayout } from '@/shared/types';
import { Category } from '@/shared/types/categories';
import { ReqSearchProduct } from '@/shared/types/itemType';

import { BestSeller, ButtonPage } from './SubItem';

const COUNT_PAGES_SHOW = 5;

const Collections: WithLayout = () => {
  const product = useAppSelector(selectProducts);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [itemCount, setItemCount] = useState<number | null>(null);
  const [take, setTake] = useState<number>(12);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(0);
  const router = useRouter();
  const { id, search } = router.query;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSubItemChoose(id));
  }, [dispatch, id]);

  const minPageShow =
    page - Math.floor(COUNT_PAGES_SHOW / 2) > 1
      ? page - Math.floor(COUNT_PAGES_SHOW / 2)
      : 1;

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

  const handleSort = async ({ page, take }: ReqSearchProduct) => {
    setIsLoading(false);
    try {
      const dataCat = await CmsApi.getCategories();
      setCategories(dataCat.data.data);

      const currentPath = window.location.pathname;
      const pathSegments = currentPath.split('/');
      let lastSegment = pathSegments[pathSegments.length - 1];
      if (lastSegment === 'all') {
        lastSegment = undefined;
      }

      const res = await CmsApi.getProducts({
        page,
        take,
        cates_slug: lastSegment,
        search: search as string,
      });
      dispatch(setProducts(res.data.data));
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

  const handleFilter = async ({ page, take }: ReqSearchProduct) => {
    setIsLoading(false);
    try {
      const dataCat = await CmsApi.getCategories();
      setCategories(dataCat.data.data);

      const currentPath = window.location.pathname;
      const pathSegments = currentPath.split('/');
      let lastSegment = pathSegments[pathSegments.length - 1];
      if (lastSegment === 'all') {
        lastSegment = undefined;
      }

      const res = await CmsApi.getProducts({
        page,
        take,
        cates_slug: lastSegment,
        start_price: minPrice,
        end_price: maxPrice,
      });
      dispatch(setProducts(res.data.data));
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
  }, [search, page]);

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <BgBanner nav='Sản phẩm' />
      <div className='my-20 grid w-full max-w-[90%] grid-cols-5 gap-6 2xl:max-w-[80%]'>
        <div className='hidden w-full lg:block'>
          <FilterCategories categories={categories} handleSort={handleSort} />
          <FilterPrice
            handleFilter={handleFilter}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
          <div>
            <h4 className='mt-12 mb-8'>Bán chạy nhất</h4>
            <div className='flex flex-col gap-6'>
              {product.slice(0, 4).map((item) => (
                <BestSeller key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
        <div className='col-span-5 lg:col-span-4'>
          <div className='flex items-center justify-between'>
            <PoperFilterCategories
              categories={categories}
              handleSort={handleSort}
            />
            <FilterPriceRes
              handleFilter={handleFilter}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
            />
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
              Hiển thị {prevPage ? page * take - 11 : 1}-
              {nextPage ? take * page : itemCount} của {itemCount}
              &nbsp;Kết quả
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Collections.getLayout = (page) => <Layout>{page}</Layout>;

export default Collections;
