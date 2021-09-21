import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ColorPicker from 'react-pick-color';

import s from '@/styles/pages/home.module.scss';

const HomePage = () => {
  const [owner, setOwner] = useState('');
  const [repositoryName, setRepositoryName] = useState('');
  const [color, setColor] = useState('#ff5959');
  const [icon, setIcon] = useState('');
  const [colorClick, toggleColorClick] = useState(false);
  const [iconClick, toggleIconClick] = useState(false);

  const [link, setLink] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwner(e.target.value);
  };

  const handleRepositoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepositoryName(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleToggleColorClick = () => toggleColorClick(!colorClick);
  const handleToggleIconClick = () => toggleIconClick(!iconClick);

  const handleIconClick = (icon: string) => {
    setIcon(icon);
    toggleIconClick(!iconClick);
  };

  return (
    <div className={`${s.root} h-full`}>
      <div
        className={`${s.title} tracking-wide text-7xl text-light-500 font-semibold text-center`}
      >
        Generate Link
      </div>
      <div className='mt-12'>
        <div>
          <button
            className='mt-6 p-3 px-9 bg-light-400 text-gray-500 rounded'
            onClick={handleToggleColorClick}
          >
            {colorClick ? 'Apply' : 'Select colors'}
          </button>
          {colorClick && (
            <ColorPicker
              combinations='tetrad'
              color={color}
              onChange={(color) => setColor(color.hex)}
            />
          )}
          <div onClick={handleToggleIconClick}>
            {iconClick ? (
              <div className='flex mt-12'>
                <span
                  onClick={() => handleIconClick('fa-star')}
                  className='mr-3'
                >
                  <i className='fa fa-star'></i>
                </span>
                <span
                  onClick={() => handleIconClick('fa-adn')}
                  className='mr-3'
                >
                  <i className='fa fa-adn'></i>
                </span>
                <span
                  onClick={() => handleIconClick('fa-anchor')}
                  className='mr-3'
                >
                  <i className='fa fa-anchor'></i>
                </span>
                <span
                  onClick={() => handleIconClick('fa-apple')}
                  className='mr-3'
                >
                  <i className='fa fa-apple'></i>
                </span>
              </div>
            ) : (
              <button className='mt-6 p-3 px-9 bg-light-400 text-gray-500 rounded'>
                Select Icon
              </button>
            )}{' '}
          </div>
          <form className='mt-6'>
            Owner name
            <input
              onChange={(e) => handleNameChange(e)}
              type='text'
              name='username'
              id='usernameId'
            />
            Repo name
            <input
              onChange={(e) => handleRepositoryChange(e)}
              type='text'
              name='repository'
              id='repositoryId'
            />
          </form>
          <button
            className='mt-6 p-3 px-9 bg-light-400 text-gray-500 rounded'
            onClick={handleSubmit}
          >
            Load
          </button>

          {link && (
            <div>
              <Link href={`/card/${link}`}>
                <a>Link is generated! Click here </a>
              </Link>{' '}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
