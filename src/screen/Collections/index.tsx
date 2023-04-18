import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import BgBanner from '@/components/common/BgBanner';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';

import { CmsApi } from '@/api/cms-api';
import { WithLayout } from '@/shared/types';
import { Category } from '@/shared/types/categories';

const Collections: WithLayout = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getCollection = async () => {
      setIsLoading(false);
      try {
        const res = await CmsApi.getCategories();
        setCategories(res.data.data);
        setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    getCollection();
  }, []);

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <BgBanner nav='Collections' />

      {isLoading ? (
        <div className='my-20 grid w-full max-w-[90%] grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-[80%] lg:grid-cols-3 xl:grid-cols-4'>
          {categories.map((category) => (
            <div
              key={category.id}
              className='flex flex-col items-center justify-center gap-4'
            >
              <NextImage
                width={500}
                height={500}
                className='h-full w-full cursor-pointer'
                src={category.image}
                alt={category.name}
              />
              <h4 className='cursor-pointer transition-all hover:text-amber-400'>
                {category.name}
              </h4>
              <span className='cursor-pointer transition-all hover:text-amber-400'>
                17 products
              </span>
              <Link
                href={`/collections/${category.slug}`}
                className='bg-black px-4 py-2 font-semibold text-white transition-all hover:bg-amber-400'
              >
                SHOP THE COLLECTION
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className='my-20 grid w-full max-w-[90%] grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-[80%] lg:grid-cols-3 xl:grid-cols-4'>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div key={index} className='flex h-full w-full flex-col gap-6'>
                <div className='h-96 bg-gray-200'></div>
                <div className='h-4 w-1/2 bg-gray-200'></div>
                <div className='h-4 bg-gray-200'></div>
                <div className='h-4 w-2/3 bg-gray-200'></div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

Collections.getLayout = (page) => <Layout>{page}</Layout>;

export default Collections;
