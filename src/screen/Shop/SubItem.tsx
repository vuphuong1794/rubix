import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { FC, useEffect, useState } from 'react';

import { IProduct } from '@/data';

import NextImage from '@/components/NextImage';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectSubColorChoose,
  selectSubItemChoose,
  selectSubPriceChoose,
  setSubColorChoose,
  setSubItemChoose,
  setSubPriceChoose,
} from '@/features/products/productSlice';

export const SubItem = ({ item }: { item: string }) => {
  const [isHover, setIsHover] = useState(false);
  const [itemChoose, setItemChoose] = useState(false);
  const getSubItemChoose = useAppSelector(selectSubItemChoose);
  const dispatch = useAppDispatch();
  const handleHover = () => {
    setIsHover(!isHover);
  };

  useEffect(() => {
    if (getSubItemChoose === item) {
      setItemChoose(true);
    } else {
      setItemChoose(false);
    }
  }, [getSubItemChoose]);

  return (
    <li
      onClick={() => dispatch(setSubItemChoose(item))}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className='flex w-full cursor-pointer items-center  gap-4'
    >
      <span
        className={`${
          isHover || itemChoose ? 'border-black bg-black' : 'bg-white'
        } flex h-4 w-4 items-center justify-center rounded-full border transition-all hover:border-black hover:bg-black`}
      >
        {isHover || itemChoose ? (
          <span className='flex items-center justify-center text-white transition-all'>
            <KeyboardArrowRightIcon style={{ width: '16px', height: '16px' }} />
          </span>
        ) : null}
      </span>
      <span>{item}</span>
    </li>
  );
};

export const SubColorItem = ({ item }: { item: string }) => {
  const [isHover, setIsHover] = useState(false);
  const [colorChoose, setColorChoose] = useState(false);
  const getSubColorChoose = useAppSelector(selectSubColorChoose);
  const dispatch = useAppDispatch();
  const handleHover = () => {
    setIsHover(!isHover);
  };

  useEffect(() => {
    if (getSubColorChoose === item) {
      setColorChoose(true);
    } else {
      setColorChoose(false);
    }
  }, [getSubColorChoose]);

  return (
    <li
      onClick={() => dispatch(setSubColorChoose(item))}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      key={item}
      className='flex cursor-pointer items-center pr-4'
    >
      <span
        className={`${item} flex h-6 w-6 items-center justify-center rounded-full border transition-all`}
      >
        {isHover || colorChoose ? (
          <span className='flex items-center justify-center text-white transition-all'>
            <AddIcon style={{ width: '16px', height: '16px' }} />
          </span>
        ) : null}
      </span>
    </li>
  );
};

export const SubPriceItem = ({ item }: { item: string }) => {
  const [isHover, setIsHover] = useState(false);
  const [priceChoose, setPriceChoose] = useState(false);
  const getSubPriceChoose = useAppSelector(selectSubPriceChoose);
  const dispatch = useAppDispatch();
  const handleHover = () => {
    setIsHover(!isHover);
  };

  useEffect(() => {
    if (getSubPriceChoose === item) {
      setPriceChoose(true);
    } else {
      setPriceChoose(false);
    }
  }, [getSubPriceChoose]);

  return (
    <li
      onClick={() => dispatch(setSubPriceChoose(item))}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className='flex w-full cursor-pointer items-center  gap-4'
    >
      <span
        className={`${
          isHover || priceChoose ? 'border-amber-400 bg-amber-400' : 'bg-white'
        } flex h-4 w-4 items-center justify-center rounded-full border transition-all hover:border-amber-400 hover:bg-amber-400`}
      >
        {isHover || priceChoose ? (
          <span className='flex items-center justify-center text-white transition-all'>
            <KeyboardArrowDownIcon style={{ width: '16px', height: '16px' }} />
          </span>
        ) : null}
      </span>
      <span
        className={`${
          isHover || priceChoose ? 'text-amber-400' : 'text-black'
        }`}
      >
        {item}
      </span>
    </li>
  );
};

export const BestSeller = ({ item }: { item: IProduct }) => {
  return (
    <div className='flex gap-4'>
      <NextImage width={60} height={120} src={item.product_image} alt='' />
      <div className='flex flex-col justify-center'>
        <span className='cursor-pointer text-sm font-bold transition-none hover:text-amber-400'>
          {item.product_name}
        </span>
        <span className='text-sm text-gray-700'>${item.product_price}.00</span>
      </div>
    </div>
  );
};
interface IButtonPage {
  title?: string;
  children?: React.ReactElement;
}
export const ButtonPage: FC<IButtonPage> = ({ children, title }) => {
  return (
    <button className='flex h-10 w-10 cursor-pointer items-center justify-center border transition-all hover:border-amber-400 hover:bg-amber-400 hover:text-white'>
      {children}
      {title}
    </button>
  );
};
