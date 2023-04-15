import { FC } from 'react';

interface IButtonCart
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title?: string;
  children?: React.ReactElement;
}

const ButtonCart: FC<IButtonCart> = (props) => {
  const { children, title, className, ...parentAttributes } = props;

  return (
    <button
      className={`${className} h-10 w-10 bg-[#f7f7f7]`}
      {...parentAttributes}
    >
      {title}
      {children}
    </button>
  );
};

export default ButtonCart;
