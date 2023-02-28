import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { Title } from '@/components/common';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';

import { WithLayout } from '@/shared/types';

interface IcaptionContent {
  image: string;
  lable: string;
  content: string;
  children?: React.ReactElement;
}

const captionContent: IcaptionContent[] = [
  { image: 'a', lable: 'a', content: 'a' },
  { image: 'b', lable: 'b', content: 'b' },
];

const Home: NextPage & WithLayout = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/albums/1/photos')
      .then((res) => {
        setCategories(res.data);
      });
  }, []);

  return (
    <div className='bg-background-home bg-cover bg-fixed bg-center bg-no-repeat'>
      {/* <div className=''>
        <NextImage
          src='/images/background.png'
          width={1000}
          height={1000}
          alt=''
        />
      </div> */}
      <div className='bg-white px-10'>
        <div className='grid w-full grid-cols-4 gap-6 bg-white pb-7'>
          <NextImage
            src='/images/banner1.png'
            alt=''
            width={1000}
            height={1000}
            className='h-full w-full'
          />
          <NextImage
            src='/images/banner2.png'
            alt=''
            width={1000}
            height={1000}
            className='h-full w-full '
          />
          <NextImage
            src='/images/banner3.png'
            alt=''
            width={1000}
            height={1000}
            className=' col-span-2 h-full w-full'
          />
        </div>
        <section className=''>
          <Title title='Trending Products' content='Top view in this week' />
          {/* {categories.map((category: any) => {
          console.log(category.url);
          return (
            <div key={category.id}>
              <div className='grid-cols-2'>
                <div>
                  <NextImage
                    width={1000}
                    height={1000}
                    className='h-full w-full'
                    src={category.url}
                    alt=''
                  />
                </div>
                <div></div>
              </div>
            </div>
          );
        })} */}
        </section>
      </div>
      <section className='flex w-full items-center justify-center bg-transparent py-[80px]'>
        <div className=' inline-block w-full max-w-[690px] bg-white py-12 px-10 text-center'>
          <h3 className='mb-3 pt-6 text-3xl'>Subcribe To Our Newsletter</h3>
          <span className='text-gray-700'>
            Sign up for the weekly newsletter and build better ecommerce stores.
          </span>
          <form className='my-8 flex w-full justify-between gap-4'>
            <input
              type='text'
              placeholder='Your email address...'
              className='w-full rounded-md border-gray-300 px-4 focus:border-gray-300'
            />
            <button
              type='submit'
              className='rounded-sm bg-black px-4 font-normal text-white transition-all hover:bg-amber-400'
            >
              Subscribe
            </button>
          </form>
          <span className='text-gray-700'>
            We respect your privacy, so we never share your info.
          </span>
        </div>
      </section>
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
