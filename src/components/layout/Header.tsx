import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Link from 'next/link';
import * as React from 'react';

import NextImage from '@/components/NextImage';

import { useAppDispatch } from '@/app/hooks';
import { login, register } from '@/features/auth/authSlice';

const links = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop', isArrow: true },
  { href: '/collections', label: 'Collections', isArrow: true },
  { href: '/blogs', label: 'Blogs', isArrow: true },
  { href: '/us', label: 'Contact Us' },
];

export default function Header() {
  const dispatch = useAppDispatch();
  return (
    <header className='sticky top-0 z-40 flex h-24 w-full min-w-[90%] items-center justify-around bg-white px-sm py-5 font-normal lg:justify-between xl:px-xl'>
      <div className='flex gap-4 lg:hidden'>
        <MenuIcon />
        <SearchOutlinedIcon />
      </div>
      <Link href='/'>
        <NextImage
          src='/images/logo_black.png'
          width={130}
          height={24}
          alt='Ribix'
        />
      </Link>
      <ul className=' hidden min-w-[600px] items-center justify-evenly gap-10 lg:flex'>
        {links.map(({ href, label, isArrow }) => (
          <li key={`${href}${label}`}>
            <Link href={href} className=' flex hover:text-yellow-300'>
              <span className='w-full'>{label}</span>
              {/* <span>{isArrow && <KeyboardArrowDownOutlinedIcon />}</span> */}
            </Link>
          </li>
        ))}
      </ul>
      <div className='relative flex items-center justify-end'>
        <ul className='flex min-w-[170px] items-center justify-center'>
          <li className='pr-2 hover:text-yellow-300'>
            <Link href='/login'>
              <PersonOutlinedIcon />
            </Link>
          </li>
          <li className='hidden pr-1 hover:text-yellow-300 xl:block'>
            <Link onClick={() => dispatch(login())} href='/login'>
              Login
            </Link>
          </li>
          <li className='hidden xl:block'>/</li>
          <li className='hidden pl-1 pr-6 hover:text-yellow-300 xl:block'>
            <Link onClick={() => dispatch(register())} href='/signup'>
              Sign up
            </Link>
          </li>
          <li>|</li>
        </ul>
        <div className='hidden cursor-pointer px-2 hover:text-yellow-300 lg:block'>
          <SearchOutlinedIcon />
        </div>
        <span className='hidden lg:block'>|</span>
        <div className='relative cursor-pointer pl-2 hover:text-yellow-300'>
          <LocalMallOutlinedIcon />
          <span className='absolute -top-3'>0</span>
        </div>
      </div>
    </header>
  );
}
