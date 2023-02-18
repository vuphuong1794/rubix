import { NextPage } from 'next';

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
  return (
    <div>
      <div className='grid w-full grid-cols-4 gap-6 pb-7'>
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
      <section className='my-8'>
        <Title title='Trending Products' content='Top view in this week' />
      </section>
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
