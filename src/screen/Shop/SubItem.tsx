import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectSubColorChoose,
  selectSubItemChoose,
  setSubColorChoose,
  setSubItemChoose,
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
          isHover || itemChoose ? 'bg-black' : 'bg-white'
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
