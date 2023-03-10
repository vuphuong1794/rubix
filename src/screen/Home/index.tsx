import AirplanemodeActiveOutlinedIcon from '@mui/icons-material/AirplanemodeActiveOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { dataSwiper, ourBlog, partner, photoSamples, product } from '@/data';

import { Title } from '@/components/common';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import ProductItem from '@/components/Products/ProductItem';

import ItemSwiper from '@/screen/Home/Swiper';
import { WithLayout } from '@/shared/types';

interface IService {
  icon: React.ReactElement;
  title: string;
  content: string;
}

const services: IService[] = [
  {
    icon: (
      <AirplanemodeActiveOutlinedIcon style={{ width: '2em', height: '2em' }} />
    ),
    title: 'Free Worldwide Shipping',
    content: 'On all orders over $75.00',
  },
  {
    icon: <PaymentOutlinedIcon style={{ width: '2em', height: '2em' }} />,
    title: '100% Payment Secure',
    content: 'We ensure secure payment with PEV',
  },
  {
    icon: (
      <KeyboardReturnOutlinedIcon style={{ width: '2em', height: '2em' }} />
    ),
    title: '30 Days Return',
    content: 'Return it within 20 day for an exchange',
  },
];

const Home: NextPage & WithLayout = () => {
  const [swiper, setSwiper] = useState<any>();

  useEffect(() => {
    const s = document.querySelector('.list-product-swiper') as any;
    setSwiper(s.swiper);
  }, []);

  const handlerPrev = () => {
    swiper.slidePrev();
  };

  const handlerNext = () => {
    swiper.slideNext();
  };

  return (
    <div className='bg-background-home bg-cover bg-fixed bg-center bg-no-repeat'>
      <div className='bg-white px-10'>
        <div className='relative mb-10 w-full overflow-hidden'>
          <span
            className='absolute top-1/2 left-2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white transition-all hover:border-amber-400 hover:bg-amber-400 hover:text-white'
            onClick={handlerPrev}
          >
            <ArrowBackIosNewIcon style={{ fontSize: '16px' }} />
          </span>
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect='fade'
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            speed={800}
            className='list-product-swiper'
          >
            {dataSwiper.map((item) => (
              <SwiperSlide key={item.content}>
                <ItemSwiper {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <span
            className='absolute top-1/2 right-2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white transition-all hover:border-amber-400 hover:bg-amber-400 hover:text-white'
            onClick={handlerNext}
          >
            <ArrowForwardIosIcon style={{ fontSize: '16px' }} />
          </span>
        </div>

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
        <section className='pb-10'>
          <Title title='Trending Products' content='Top view in this week' />
          <div className='grid grid-flow-col gap-6'>
            <div>
              <NextImage
                className='h-full w-full cursor-pointer'
                width={1000}
                height={1000}
                src='https://cdn.shopify.com/s/files/1/0376/9440/6700/files/banner-product_1080x.jpg?v=1629543119'
                alt=''
              />
            </div>
            <div className='grid grid-cols-3 gap-6'>
              {product.slice(0, 6).map((item) => (
                <ProductItem key={item.product_image} item={item} />
              ))}
            </div>
          </div>
        </section>
        <section className='mt-10 pb-6'>
          <div className='flex gap-6'>
            <NextImage
              width={1000}
              height={1000}
              src='https://cdn.shopify.com/s/files/1/0376/9440/6700/files/banner14_900x.jpg?v=1629543119'
              alt=''
            />
            <NextImage
              width={1000}
              height={1000}
              src='https://cdn.shopify.com/s/files/1/0376/9440/6700/files/banner15_900x.jpg?v=1629543119'
              alt=''
            />
          </div>
        </section>
        <section className='pb-16'>
          <Title title='Best Seller Products' content='Top view in this week' />
          <div className='grid grid-cols-6 gap-6'>
            {product.slice(0, 12).map((item) => (
              <ProductItem key={item.product_image} item={item} />
            ))}
          </div>
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
      <div className=' bg-white'>
        <section className='bg-[#f8f8f8] px-10'>
          <div className='flex w-full items-center justify-around py-20 '>
            {services.map((service) => (
              <div
                key={service.title}
                className='flex w-full flex-col items-center justify-center gap-2 border-r last:border-0'
              >
                <span>{service.icon}</span>
                <h4 className='font-semibold'>{service.title}</h4>
                <p>{service.content}</p>
                <Link href='/' className='mt-2'>
                  <span className='font-bold'>Learn More</span>
                  <span>
                    <KeyboardArrowRightOutlinedIcon />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </section>
        <section className='px-10 pt-10'>
          <Title
            title='From Our Blog'
            content='Commodo sociosqu venenatis cras dolor sagittis integer luctus sem primis eget'
          />
          <div className='flex gap-6 pt-2'>
            {ourBlog.map((item) => (
              <div className='flex w-full flex-col gap-4' key={item.author}>
                <NextImage
                  className='w-full cursor-pointer'
                  width={600}
                  height={600}
                  src={item.blog_image}
                  alt=''
                />
                <span className='w-20 cursor-pointer rounded-md bg-amber-400 py-1  text-center text-xs font-bold text-white'>
                  LIFESTYLE
                </span>
                <div>
                  <div className='flex'>
                    <h6 className='mr-2 font-bold'>{item.author}</h6>
                    <span className='text-gray-700'>{item.date}</span>
                  </div>
                  <h4 className='pb-6 pt-2 text-xl'>{item.title}</h4>
                  <p className='text-gray-700'>{item.description}</p>
                </div>
                <button className='mt-6 flex h-full w-full items-end'>
                  <div className='flex h-14 w-36 items-center justify-center gap-1 rounded-md border-2 font-semibold transition-all hover:border-amber-400 hover:text-amber-400'>
                    <span>Read More</span>
                    <span>
                      <KeyboardArrowRightIcon />
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </section>
        <section className='px-10'>
          <div className='mt-10 flex items-center justify-around border-t border-b p-5'>
            {partner.map((item) => (
              <NextImage
                key={item}
                src={item}
                alt=''
                width='78'
                height='72'
                className='transition-all hover:opacity-50'
              />
            ))}
          </div>
        </section>
        <section className='px-10 pt-10 pb-20'>
          <Title title='Follow us on Instagram' content='@ Rubix Instagram' />
          <div className='flex gap-6'>
            {photoSamples.map((item) => (
              <NextImage
                className='cursor-pointer'
                key={item}
                src={item}
                alt=''
                width='500'
                height='500'
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

Home.getLayout = (page: any) => {
  return <Layout>{page}</Layout>;
};
