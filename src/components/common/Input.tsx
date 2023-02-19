import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { FC, useState } from 'react';

interface IInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  eyeEnable?: boolean;
}

const Input: FC<IInput> = (props) => {
  const [isHidden, setHidden] = useState<boolean>(false);
  const { type, eyeEnable, ...parentAttributes } = props;
  const HiddenPassword = () => {
    setHidden(!isHidden);
  };
  const getType = () => {
    if (type) {
      return type;
    } else {
      return !isHidden ? 'password' : props.type;
    }
  };

  return (
    <div className='relative mb-4 flex  h-[56px] w-full items-center justify-between rounded-lg border border-solid border-gray-300'>
      <input
        {...parentAttributes}
        className=' h-full w-full rounded-lg px-3 outline-none'
        type={getType()}
      />
      {eyeEnable ? (
        !isHidden ? (
          <VisibilityOutlinedIcon
            className='absolute right-2 text-gray-400 '
            onClick={HiddenPassword}
          />
        ) : (
          <VisibilityOffOutlinedIcon
            className='absolute right-2 text-gray-400'
            onClick={HiddenPassword}
          />
        )
      ) : null}
    </div>
  );
};

export default Input;
