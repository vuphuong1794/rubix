import {
  Badge,
  Button,
  Drawer,
  IconButton,
  MenuItem,
  MenuList,
  Popover,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';
import { MdOutlineLocalMall } from 'react-icons/md';
import { RiCloseCircleFill } from 'react-icons/ri';

import SearchHeader from '@/components/layout/SearchHeader';
import NextImage from '@/components/NextImage';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { ROUTES } from '@/constant';
import { login, register } from '@/features/auth/authSlice';
import {
  fetchTotal,
  selectChooseHref,
  setChooseHref,
} from '@/features/cart/cartSlice';

const links = [
  { href: '/', label: 'Trang chủ' },
  { href: '/collections/all', label: 'Cửa hàng' },
  { href: '/collections', label: 'Bộ sưu tập' },
  { href: '/blogs', label: 'Bài viết' },
  { href: '/us', label: 'Liên hệ' },
];

export default function Header() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [openDr, setOpenDr] = React.useState(false);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpenDr(true);
  };

  const handleDrawerClose = () => {
    setOpenDr(false);
  };

  const open = Boolean(anchorEl);

  React.useEffect(() => {
    dispatch(fetchTotal());
  }, [dispatch]);

  const total = useAppSelector((state) => state.cart.total);

  const navigate = useRouter();
  const chooseHref = useAppSelector(selectChooseHref);

  const handleNavigate = (href: string) => {
    setOpenDr(false);
    dispatch(setChooseHref(href));
    navigate.push(href);
  };

  return (
    <header className='sticky top-0 z-40 flex h-24 w-full min-w-[90%] items-center justify-around bg-white  py-5 font-normal sm:px-sm lg:justify-between xl:px-xl'>
      <div className='flex gap-4 lg:hidden'>
        <IconButton onClick={handleDrawerOpen}>
          <AiOutlineMenu className='cursor-pointer' />
        </IconButton>
        <SearchHeader />
      </div>
      <Link href='/'>
        <NextImage
          src='/images/logo_black.png'
          width={130}
          height={24}
          alt='Ribix'
        />
      </Link>
      <MenuList className=' hidden min-w-[600px] items-center justify-evenly gap-10 lg:flex'>
        {links.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <Link
              href={href}
              className={`flex
               ${chooseHref === href ? 'text-yellow-300' : 'text-gray-700'}
            hover:text-yellow-300`}
            >
              <span className='w-full'>{label}</span>
            </Link>
          </li>
        ))}
      </MenuList>
      <Drawer
        anchor='left'
        open={openDr}
        onClose={handleDrawerClose}
        className='relative'
      >
        <IconButton
          onClick={handleDrawerClose}
          className='absolute right-1 m-2 cursor-pointer'
        >
          <RiCloseCircleFill />
        </IconButton>
        <Link href='/'>
          <NextImage
            src='/images/logo_black.png'
            width={130}
            height={24}
            alt='Ribix'
            className='mx-auto mt-12'
          />
        </Link>
        <MenuList className=' m-6 mt-10 min-w-[300px] flex-col items-center justify-center gap-10'>
          {links.map(({ href, label }) => (
            <MenuItem
              key={`${href}${label}`}
              onClick={() => handleNavigate(href)}
              className={`flex p-3 
              ${
                chooseHref === href
                  ? 'border-b-2 border-yellow-300 text-yellow-300'
                  : 'text-gray-700'
              }
              hover:text-yellow-300`}
            >
              <Link href={href}>
                <span className='w-full'>{label}</span>
              </Link>
            </MenuItem>
          ))}
        </MenuList>
      </Drawer>
      <div className='relative flex items-center justify-end'>
        {session && (
          <div className='hover:text-yellow-300'>
            <IconButton onClick={handlePopoverOpen}>
              <BsFillPersonFill />
            </IconButton>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <div className='flex flex-col items-center justify-center gap-2 p-4'>
                <Button
                  startIcon={
                    <Image
                      src='/svg/order.svg'
                      width={20}
                      height={20}
                      alt='avatar'
                      className='fill-[#1976d2]'
                    />
                  }
                  size='small'
                  onClick={() => {
                    handlePopoverClose();
                    router.push(ROUTES.ORDER);
                  }}
                >
                  Đơn đã mua
                </Button>
              </div>
              <div className='flex flex-col items-center justify-center gap-2 p-4'>
                <Button
                  startIcon={<IoIosLogOut className='h-6 w-6' />}
                  size='small'
                  onClick={() => signOut()}
                >
                  Đăng xuất
                </Button>
              </div>
            </Popover>
          </div>
        )}
        {!session ? (
          <ul className='flex min-w-[170px] items-center justify-center'>
            <li className='pr-1 hover:text-yellow-300 xl:block'>
              <Link onClick={() => dispatch(login())} href='/login'>
                Đăng nhập
              </Link>
            </li>
            <li className=' xl:block'>/</li>
            <li className=' pl-1 pr-6 hover:text-yellow-300 xl:block'>
              <Link onClick={() => dispatch(register())} href='/signup'>
                Đăng ký
              </Link>
            </li>
          </ul>
        ) : (
          <div className='flex justify-center'>
            <span className='lg:mt-2'>{session.user.username}</span>
            <div className='hidden cursor-pointer px-2 hover:text-yellow-300 lg:block'>
              <SearchHeader />
            </div>
          </div>
        )}
        {session && (
          <Link href='/cart'>
            <Badge
              title='Giỏ hàng'
              className='relative cursor-pointer pl-2'
              badgeContent={total}
            >
              <MdOutlineLocalMall className='h-6 w-6' />
            </Badge>
          </Link>
        )}
      </div>
    </header>
  );
}
