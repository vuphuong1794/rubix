import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

import { categories, ourBlog, tags } from '@/data';

import Blog from '@/components/Blogs';
import BgBanner from '@/components/common/BgBanner';
import Layout from '@/components/layout/Layout';

import { ButtonPage } from '@/screen/Shop/SubItem';
import { WithLayout } from '@/shared/types';

const Blogs: WithLayout = () => {
  const [openRA, setOpenRA] = React.useState(false);
  const [openCategories, setOpenCategories] = React.useState(false);
  const [openTags, setOpenTags] = React.useState(false);
  const handlerOpenRA = () => {
    setOpenRA(!openRA);
  };
  const handlerOpenCategories = () => {
    setOpenCategories(!openCategories);
  };
  const handlerOpenTags = () => {
    setOpenTags(!openTags);
  };
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <BgBanner nav='Blogs' />
      <div className='my-20 flex w-full max-w-[92%] grid-cols-5 flex-col gap-6 xl:grid 2xl:max-w-[80%]'>
        <div className='block w-full'>
          <div className='relative mb-12 h-12 w-full rounded-md border border-gray-300'>
            <input
              type='text'
              placeholder='Search our blogs'
              className='h-full w-full rounded pl-4 outline-none'
            />
            <span className='absolute right-0 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-between border-l border-gray-600 px-4 text-gray-600 transition-all hover:text-amber-400'>
              <SearchIcon />
            </span>
          </div>
          <div className=' border-t border-b'>
            <div
              className='flex w-full items-center justify-between'
              onClick={handlerOpenRA}
            >
              <h4 className='my-8'>Recent Articles</h4>
              <span className='block xl:hidden'>
                {!openRA ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
              </span>
            </div>
            <div className={!openTags ? 'hidden xl:block' : 'block'}></div>
          </div>
          <div className='border-b'>
            <div
              className='flex w-full items-center justify-between'
              onClick={handlerOpenCategories}
            >
              <h4 className='my-8'>Categories</h4>
              <span className='block xl:hidden'>
                {!openCategories ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </span>
            </div>
            <div className={!openCategories ? 'hidden xl:block' : 'block'}>
              <ul className='pb-8'>
                {categories.map((item) => (
                  <li
                    key={item}
                    className='ml-4 cursor-pointer list-disc pb-4 text-gray-700 hover:text-amber-400'
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div
              className='flex w-full items-center justify-between'
              onClick={handlerOpenTags}
            >
              <h4 className='my-8'>Articles Tags</h4>
              <span className='block xl:hidden'>
                {!openTags ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </span>
            </div>
            <div className={!openTags ? 'hidden xl:block' : 'block'}>
              <div className='flex flex-wrap gap-2 pb-12'>
                {tags.map((item) => (
                  <span
                    className=' cursor-pointer rounded-md bg-gray-200 p-2 transition-all hover:bg-amber-400 hover:text-white'
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* <NextImage
            width={500}
            height={300}
            src='https://cdn.shopify.com/s/files/1/0376/9440/6700/files/banner2_360x.jpg?v=1629543119'
            alt=''
            className='hidden h-full w-full cursor-pointer object-cover xl:block'
          /> */}
        </div>
        <div className='col-span-5 xl:col-span-4'>
          <div className='grid gap-6 sm:grid-cols-2'>
            {ourBlog.map((item) => (
              <Blog key={item.author} item={item} />
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

Blogs.getLayout = (page) => <Layout>{page}</Layout>;

export default Blogs;
