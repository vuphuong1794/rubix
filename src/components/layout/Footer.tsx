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
  'Tài khoản của tôi',
  'Theo dõi đơn hàng của bạn',
  'Các câu hỏi thường gặp',
  'Phương thức thanh toán',
  'Hướng dẫn vận chuyển',
  'Hỗ trợ sản phẩm',
  'Số dư thẻ quà tặng',
];

const moreFromRubix: { label: string; href: string }[] = [
  { label: 'Về Rubix', href: 'javascript:void(0)' },
  { label: 'Cam kết của chúng tôi', href: 'javascript:void(0)' },
  { label: 'Điều khoản và điều kiện', href: 'javascript:void(0)' },
  { label: 'Chính sách đổi trả', href: '/policy/return' },
  { label: 'Chính sách bảo hành', href: '/policy/warranty' },
  { label: 'Chính sách giao hàng', href: '/policy/shipping' },
  { label: 'Bản đồ', href: '/us' },
];

interface Iicon {
  href: string;
  icon: React.ReactElement;
}

const icon: Iicon[] = [
  {
    href: 'https://www.facebook.com/tranngocthanh.tran.10',
    icon: <FacebookIcon />,
  },
  {
    href: 'https://www.facebook.com/tranngocthanh.tran.10',
    icon: <TwitterIcon />,
  },
  {
    href: 'https://www.facebook.com/tranngocthanh.tran.10',
    icon: <InstagramIcon />,
  },
  {
    href: 'https://www.facebook.com/tranngocthanh.tran.10',
    icon: <PinterestIcon />,
  },
  {
    href: 'https://www.facebook.com/tranngocthanh.tran.10',
    icon: <YouTubeIcon />,
  },
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
      <div className='flex w-full flex-col px-sm pt-[70px] pb-10  sm:grid sm:grid-cols-2 md:grid-cols-4 lg:gap-0 xl:px-xl '>
        <div className='mt-[6px]  flex flex-col'>
          <Link href='/'>
            <NextImage
              src='/images/logo_white.png'
              width={130}
              height={24}
              alt='Ribix'
              className='w-full pt-[10px] pb-10'
            />
          </Link>
          <div className='flex w-full flex-wrap gap-4'>
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
            <h4 className='mb-[10px] py-[10px] text-sm font-medium lg:text-lg'>
              Thông tin công ty
            </h4>
            <span className='mb-2 block sm:hidden'>
              {!openIC ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </span>
          </div>
          <ul className={!openIC ? 'hidden sm:block' : 'block'}>
            {infoCompany.map((item) => (
              <li
                key={item}
                className='cursor-pointer py-[5px] text-[12px] text-[#999] hover:text-amber-400 hover:transition-all lg:text-sm'
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
            <h4 className='mb-[10px] py-[10px] text-sm font-medium lg:text-lg'>
              Nhiều hơn từ Rubix
            </h4>
            <span className='mb-2 block sm:hidden'>
              {!openMFR ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </span>
          </div>
          <ul className={!openMFR ? 'hidden sm:block' : 'block'}>
            {moreFromRubix.map((item) => (
              <li
                key={item.label}
                className='w-full cursor-pointer py-[5px] text-[12px] text-[#999] hover:text-amber-400 hover:transition-all lg:text-sm'
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='w-full'>
          <div>
            <h4 className='mb-[10px] py-[10px] text-sm font-medium lg:text-lg'>
              Hãy nói chuyện
            </h4>
            <div className='flex items-start gap-3 text-[#999]'>
              <div>
                <HeadphonesIcon />
              </div>
              <div className='cursor-text text-[12px] lg:text-sm'>
                +391 (0)35 2568 4593 <br />
                <u>hello@domain.com</u>
              </div>
            </div>
          </div>
          <div>
            <h4 className='mb-[10px] py-[10px] text-sm font-medium lg:text-lg'>
              Tìm chúng tôi
            </h4>
            <div className='flex items-start gap-3 text-[#999]'>
              <div>
                <LocationOnIcon />
              </div>
              <div className='cursor-text text-[12px] lg:text-sm'>
                +391 (0)35 2568 4593 <br />
                <u>hello@domain.com</u>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full items-center justify-between border-t border-[#999] py-8 px-sm text-[#999] xl:px-xl '>
        <div className='flex-1'>
          <Link href='/'>
            <b className='text-white'>© 2023 Rubix.</b>
          </Link>{' '}
          <span className='text-md'>Mọi quyền được bảo lưu</span>
        </div>
        <div className='mr-10 hidden flex-1 justify-end md:flex lg:mr-0'>
          <NextImage
            src='/images/payment_logo.png'
            width={429}
            height={36}
            alt='Ribix'
            className='h-[70%] w-[70%] lg:h-full lg:w-full'
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
