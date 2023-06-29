import AirplanemodeActiveOutlinedIcon from '@mui/icons-material/AirplanemodeActiveOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Autoplay, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { dataSwiper, ourBlog, partner, photoSamples } from '@/data';

import Blog from '@/components/Blogs';
import { Input, Title } from '@/components/common';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import ProductItem from '@/components/Products/ProductItem';

import { CmsApi } from '@/api/cms-api';
import ItemSwiper from '@/screen/Home/Swiper';
import { WithLayout } from '@/shared/types';
import { ReqSearchProduct } from '@/shared/types/itemType';
import { Product } from '@/shared/types/productType';

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
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    const handleSort = async ({ page, take }: ReqSearchProduct) => {
      try {
        const res = await CmsApi.getProducts({ page, take });
        setProduct(res.data.data);
      } catch (error) {
        toast.error('Lỗi load sản phẩm');
      }
    };
    handleSort({ page: 1, take: 12 });
  }, []);

  return (
    <div className='bg-background-home bg-cover bg-fixed bg-center bg-no-repeat'>
      <div className='bg-white px-10'>
        <div className='relative mb-10 w-full overflow-hidden'>
          <Swiper
            className='swiper'
            modules={[Autoplay, EffectFade, Pagination]}
            slidesPerView={1}
            // effect='fade'
            // fadeEffect={{ crossFade: true }}
            loop={true}
            scrollbar={{ draggable: true }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            speed={800}
          >
            {/* <span
              className='absolute top-1/2 left-2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white transition-all hover:border-amber-400 hover:bg-amber-400 hover:text-white'
              onClick={() => {
                console.log(swiper);
                swiper.slidePrev();
              }}
            >
              <ArrowBackIosNewIcon style={{ fontSize: '16px' }} />
            </span> */}
            <div>
              {dataSwiper.map((item) => (
                <SwiperSlide key={item.image}>
                  <ItemSwiper {...item} />
                </SwiperSlide>
              ))}
            </div>
            {/* <span
              className='absolute top-1/2 right-2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white transition-all hover:border-amber-400 hover:bg-amber-400 hover:text-white'
              onClick={() => swiper.slideNext()}
            >
              <ArrowForwardIosIcon style={{ fontSize: '16px' }} />
            </span> */}
          </Swiper>
        </div>

        <div className='grid w-full grid-cols-2 gap-6 bg-white pb-7 md:grid-cols-4'>
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
            className=' col-span-2 hidden h-full w-full md:block'
          />
        </div>
        <section className='pb-10'>
          <Title title='Trending Products' content='Top view in this week' />
          <div className='grid grid-flow-col gap-6'>
            <div>
              <NextImage
                className='hidden h-full w-full cursor-pointer md:block'
                width={1000}
                height={1000}
                src='https://cdn.shopify.com/s/files/1/0376/9440/6700/files/banner-product_1080x.jpg?v=1629543119'
                alt=''
              />
            </div>
            <div className='grid grid-cols-2 gap-6 md:grid-cols-3'>
              {product.slice(0, 6).map((item) => (
                <ProductItem key={item.id} item={item} />
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
        <section className='hidden pb-16 md:block'>
          <Title title='Best Seller Products' content='Top view in this week' />
          <div className='grid gap-6  md:grid-cols-4 xl:grid-cols-6'>
            {product.map((item) => (
              <ProductItem key={item.id} item={item} />
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
            <Input
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
          <div className='hidden w-full items-center justify-around py-20 md:flex '>
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
          <div className='grid grid-cols-2 gap-6 pt-2 md:grid-cols-3'>
            {ourBlog.slice(0, 3).map((item) => (
              <Blog key={item.author} item={item} />
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
          <div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6'>
            {photoSamples.map((item) => (
              <NextImage
                className='h-full w-full cursor-pointer'
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

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
