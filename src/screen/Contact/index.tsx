import React from 'react';

import { Input } from '@/components/common';
import Layout from '@/components/layout/Layout';

import { WithLayout } from '@/shared/types';

interface PropsContact {
  field: string;
  value: string;
}

const data: PropsContact[] = [
  {
    field: 'Add:',
    value: 'No 40 Baria Sreet 133/2, NewYork',
  },
  {
    field: 'Phone:',
    value: '+1 800 1236879',
  },
  {
    field: 'Email:',
    value: 'hieuhoi912002@gmail.com',
  },
  {
    field: 'Open:',
    value: 'Mon - Fri: 8:00 - 18:00',
  },
];

const Contact: WithLayout = () => {
  return (
    <div>
      <iframe
        className='h-[600px] w-full'
        src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9462.662769091721!2d106.6275687!3d10.857961!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a1fc161b16d%3A0x7b1555dd7b5e0080!2zMTEzIMSQw7RuZyBC4bqvYywgVMOibiBDaMOhbmggSGnhu4dwLCBRdeG6rW4gMTIsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e1!3m2!1svi!2s!4v1678776280323!5m2!1svi!2s'
        width='600'
        height='450'
        loading='lazy'
        allowFullScreen
      ></iframe>
      <div className='flex w-full items-start justify-center'>
        <div className='my-20 flex max-w-[80%] items-start justify-between gap-10'>
          <div className='flex w-1/2 flex-col gap-6'>
            <h3 className='font-semibold'>CONTACT US</h3>
            <p className='text-gray-700'>
              Nor again is there anyone who loves or pursues or desires to
              obtain pain of itself, because it is pain.no annoying
              consequences.
            </p>
            <div className='flex flex-col gap-2 text-gray-700'>
              {data.map((item) => (
                <div key={item.field}>
                  <strong className='text pr-2'>{item.field}</strong>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <form className='flex w-1/2 flex-col gap-4'>
            <Input type='text' placeholder='Name' />
            <Input type='text' placeholder='Email' className='rounded' />
            <textarea
              placeholder='Message'
              className='mb-4 h-32 w-full rounded border border-gray-300 pt-4 pl-2 outline-none'
            />
            <button className='h-14 w-full rounded border border-gray-300 transition-all hover:border-amber-400 hover:text-amber-400'>
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
Contact.getLayout = (page) => <Layout>{page}</Layout>;
export default Contact;
