import FacebookIcon from '@mui/icons-material/Facebook';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Link from 'next/link';
import React from 'react';

import NextImage from '@/components/NextImage';

const infoCompany: string[] = [
  'My Account',
  'Track Your Order',
  'FAQs',
  'Payment Methods',
  'Shipping Guide',
  'Products Support',
  'Gift Card Balance',
];

const moreFromRubix: string[] = [
  'About Rubix',
  'Our Guarantees',
  'Terms and Conditions',
  'Privacy Policy',
  'Return Policy',
  'Delivery & Return',
  'Sitemap',
];
interface Iicon {
  href: string;
  icon: React.ReactElement;
}

const icon: Iicon[] = [
  { href: 'https://www.facebook.com/hieuhoi91', icon: <FacebookIcon /> },
  { href: 'https://www.facebook.com/hieuhoi91', icon: <TwitterIcon /> },
  { href: 'https://www.facebook.com/hieuhoi91', icon: <InstagramIcon /> },
  { href: 'https://www.facebook.com/hieuhoi91', icon: <PinterestIcon /> },
  { href: 'https://www.facebook.com/hieuhoi91', icon: <YouTubeIcon /> },
];

const Footer = () => {
  const [openIC, setOpenIC] = React.useState(false);
  const [openMFR, setOpenMFR] = React.useState(false);
  const handlerOpenIC = () => {
    setOpenIC(!openIC);
  };
  const handlerOpenMFR = () => {
    setOpenMFR(!openMFR);
  };

  return (
    <footer className='w-full bg-[#1a1a1a] text-white'>
      <div className='flex w-full flex-col px-sm  pt-[70px] pb-10 sm:grid sm:grid-cols-2 md:grid-cols-4 xl:px-xl '>
        <div className='flex flex-col'>
          <Link href='/'>
            <NextImage
              src='/images/logo_white.png'
              width={130}
              height={24}
              alt='Ribix'
              className='w-full pt-[10px] pb-10'
            />
          </Link>
          <div className='flex w-full gap-4'>
            {icon.map((item, idx) => (
              <a
                href={item.href}
                key={idx}
                className='cursor-pointer transition-all hover:text-amber-400'
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
        <div className='h-full w-full '>
          <div
            className='flex w-full items-center justify-between '
            onClick={handlerOpenIC}
          >
            <h4 className='mb-[10px] py-[10px] font-medium'>
              Information Company
            </h4>
            <span className='block sm:hidden'>
              {!openIC ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </span>
          </div>
          <ul className={!openIC ? 'hidden sm:block' : 'block'}>
            {infoCompany.map((item) => (
              <li
                key={item}
                className='cursor-pointer py-[5px] text-sm text-[#999] hover:text-amber-400 hover:transition-all'
              >
                <a href=''>{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className='h-full w-full '>
          <div
            className='flex w-full items-center justify-between sm:block'
            onClick={handlerOpenMFR}
          >
            <h4 className='mb-[10px] py-[10px] font-medium'>More From Rubix</h4>
            <span className='block sm:hidden'>
              {!openMFR ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </span>
          </div>
          <ul className={!openMFR ? 'hidden sm:block' : 'block'}>
            {moreFromRubix.map((item) => (
              <li
                key={item}
                className='cursor-pointer py-[5px] text-sm text-[#999] hover:text-amber-400 hover:transition-all'
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div>
            <h4 className='mb-[10px] py-[10px] font-medium'>Let’s Talk</h4>
            <div className='flex items-start gap-3 text-[#999]'>
              <div>
                <HeadphonesIcon />
              </div>
              <div className='cursor-text'>
                +391 (0)35 2568 4593 <br />
                <u>hello@domain.com</u>
              </div>
            </div>
          </div>
          <div>
            <h4 className='mb-[10px] py-[10px] font-medium'>Find Us</h4>
            <div className='flex items-start gap-3 text-[#999]'>
              <div>
                <LocationOnIcon />
              </div>
              <div className='cursor-text'>
                +391 (0)35 2568 4593 <br />
                <u>hello@domain.com</u>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full items-center justify-between border-t border-[#999] py-8 px-sm text-[#999] xl:px-xl '>
        <div>
          <Link href='/'>
            <b className='text-white'>© 2021 Rubix.</b>
          </Link>{' '}
          All Rights Reserved
        </div>
        <div className='hidden md:block'>
          <NextImage
            src='/images/payment_logo.png'
            width={429}
            height={36}
            alt='Ribix'
            className='h-full w-full'
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
