import ReactDOM from 'react-dom';

import { useAppDispatch } from '@/app/hooks';
import { closeShoppingCart } from '@/features/cart/cartSlice';

// TODO: Need refactoring
const Potal = () => {
  const dispatch = useAppDispatch();
  const handleCloseShoppingCart = () => {
    dispatch(closeShoppingCart());
  };

  return ReactDOM.createPortal(
    <div
      className='fixed top-0 left-0 z-20 h-full w-full bg-black opacity-80'
      onClick={handleCloseShoppingCart}
    ></div>,
    document.querySelector('body') as HTMLElement
  );
};

export default Potal;
