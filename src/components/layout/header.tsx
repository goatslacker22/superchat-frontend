import Link from 'next/link';
import React from 'react';

import s from '@/styles/components/header.module.scss';

/* interface Props {} */

const Header = (/* props: Props */) => {
  return (
    <div className='relative bg-gray-400 text-light-400'>
      <div className='flex justify-center mx-auto px-4 sm:px-6'>
        <div
          className={`${s.header} flex justify-between items-center py-6 md:justify-start md:space-x-10`}
        >
          <nav className='hidden md:flex space-x-10'>
            <span>
              <Link href={`/`}>
                <a className='text-base font-medium text-light-500 hover:text-primary-600'>
                  Home
                </a>
              </Link>
            </span>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
