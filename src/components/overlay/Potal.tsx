import ReactDOM from 'react-dom';

// TODO: Need refactoring
const Potal = () => {
  return ReactDOM.createPortal(
    <div className='fixed top-0 left-0 z-20 h-full w-full bg-black opacity-80'></div>,
    document.querySelector('body') as HTMLElement
  );
};

export default Potal;
