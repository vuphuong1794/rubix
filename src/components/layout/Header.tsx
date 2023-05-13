import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import NextImage from '@/components/NextImage';
import Potal from '@/components/overlay/Potal';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { login, register } from '@/features/auth/authSlice';
import { openShoppingCart, selectShowCart } from '@/features/cart/cartSlice';

const links = [
  { href: '/', label: 'Home' },
  { href: '/collections/all', label: 'Shop', isArrow: true },
  { href: '/collections', label: 'Collections', isArrow: true },
  { href: '/blogs', label: 'Blogs', isArrow: true },
  { href: '/us', label: 'Contact Us' },
];

export default function Header() {
  const [showList, setShowList] = useState(false);
  const showCart = useAppSelector(selectShowCart);

  const handleShowList = () => {
    setShowList(!showList);
  };

  const handleShowShoppingCart = (e: React.MouseEvent<Element, MouseEvent>) => {
    dispatch(openShoppingCart());
    e.preventDefault();
  };

  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  return (
    <header className='sticky top-0 z-40 flex h-24 w-full min-w-[90%] items-center justify-around bg-white  py-5 font-normal sm:px-sm lg:justify-between xl:px-xl'>
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
        {links.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <Link href={href} className=' flex hover:text-yellow-300'>
              <span className='w-full'>{label}</span>
              {/* <span>{isArrow && <KeyboardArrowDownOutlinedIcon />}</span> */}
            </Link>
          </li>
        ))}
      </ul>
      <div className='relative flex items-center justify-end'>
        <div className='pr-2 hover:text-yellow-300'>
          <Link href='/login'>
            <PersonOutlinedIcon />
          </Link>
        </div>
        {!session ? (
          <ul className='hidden min-w-[170px] items-center justify-center xl:flex'>
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
        ) : (
          <div>{session.user.username}</div>
        )}
        <div className='hidden cursor-pointer px-2 hover:text-yellow-300 lg:block'>
          <SearchOutlinedIcon />
        </div>
        <span className='hidden lg:block'>|</span>
        <Link href='/cart'>
          <div className='relative cursor-pointer pl-2 hover:text-yellow-300'>
            <LocalMallOutlinedIcon />
            <span className='absolute -top-3'>0</span>
          </div>
        </Link>
      </div>
      {showCart ? <Potal /> : null}
      {/* <ShoppingCart
        className={showCart ? 'right-side-cart show' : 'right-side-cart'}
      /> */}
    </header>
  );
}
