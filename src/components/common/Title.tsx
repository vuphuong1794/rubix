import { FC } from 'react';

interface ITitle {
  title: string;
  content: string;
}

const Title: FC<ITitle> = ({ title, content }) => {
  return (
    <div className='flex flex-col items-center justify-center pb-5'>
      <h2 className='pb-2 text-3xl font-semibold'>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Title;
