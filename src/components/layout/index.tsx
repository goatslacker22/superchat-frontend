import React from 'react';

import Footer from './footer';
import Header from './header';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className='h-screen flex flex-col justify-between bg-gray-400 text-light-500'>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
