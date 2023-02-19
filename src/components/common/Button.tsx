import { DetailedHTMLProps, FC } from 'react';

interface IButton
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
  small?: boolean;
  large?: boolean;
}
// { title, small, large, className = "", onClick, type }

const Button: FC<IButton> = (props) => {
  const { title, children, ...parentAttributes } = props;

  const width = () => {
    if (props.small) {
      return 'w-[20%] h-[42px]';
    } else if (props.large) {
      return 'w-full h-[48px] ';
    }
    return '';
  };

  const getClassName = () => {
    return width() + ' ' + props.className;
  };

  return (
    <button {...parentAttributes} className={`${getClassName()}`}>
      <span>{children}</span>
      {title}
    </button>
  );
};

export default Button;
