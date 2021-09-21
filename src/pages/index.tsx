import { useLazyQuery } from '@apollo/client';
import { doc, setDoc } from '@firebase/firestore';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ColorPicker from 'react-pick-color';
import { v4 as uuidv4 } from 'uuid';

import s from '@/styles/pages/home.module.scss';

import { GET_REPO_DATA } from '@/graphQueries/repository';
import {
  GetRepoData,
  GetRepoDataVariables,
} from '@/graphQueries/repository/__generated__/GetRepoData';

import db from '../firebase';

const HomePage = () => {
  const router = useRouter();
  const [owner, setOwner] = useState('');
  const [repositoryName, setRepositoryName] = useState('');
  const [color, setColor] = useState('#ff5959');
  const [icon, setIcon] = useState('');
  const [colorClicked, toggleColorClick] = useState(false);
  const [iconClicked, toggleIconClick] = useState(false);

  const [link, setLink] = useState('');

  const [getData, { loading, data, error }] = useLazyQuery<
    GetRepoData,
    GetRepoDataVariables
  >(GET_REPO_DATA, {
    fetchPolicy: 'no-cache',
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwner(e.target.value);
  };

  const handleRepositoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepositoryName(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    getData({ variables: { name: repositoryName, owner } });
  };

  const handleToggleColorClick = () => toggleColorClick(!colorClicked);
  const handleToggleIconClick = () => toggleIconClick(!iconClicked);

  const handleIconClick = (icon: string) => {
    setIcon(icon);
    toggleIconClick(!iconClicked);
  };

  useEffect(() => {
    if (!loading && data) {
      const id = uuidv4().slice(0, 5);
      const copy = {
        ...data?.repository,
        color,
        repositoryId: data.repository?.id,
        icon,
        id,
      };

      setDoc(doc(db, 'cards', id), copy)
        .then((data) => {
          setLink(id);
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    }
  }, [loading, data, color]);

  return (
    <div className={`${s.root} h-full px-9 sm`}>
      <div
        className={`${s.title} tracking-wide text-7xl text-light-500 font-semibold text-center`}
      >
        Generate Link
      </div>
      <div className='mt-12'>
        <div>
          <div className='flex items-center'>
            <button
              className='mt-6 p-3 px-9 bg-light-400 text-gray-500 rounded'
              onClick={handleToggleColorClick}
            >
              {colorClicked ? 'Apply' : <span>Select colors</span>}
            </button>
            <div
              onClick={handleToggleColorClick}
              className='ml-3 mt-6 w-6 h-6'
              style={{ background: color }}
            ></div>
            {colorClicked && (
              <ColorPicker
                combinations='tetrad'
                color={color}
                onChange={(color) => setColor(color.hex)}
              />
            )}
          </div>
          <div onClick={handleToggleIconClick}>
            {iconClicked ? (
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
              <div>
                <button className='mt-6 p-3 px-9 bg-light-400 text-gray-500 rounded'>
                  Select Icon
                </button>
                {icon && (
                  <span className='mt-3 ml-6'>
                    <i className={`fa ${icon}`}></i>
                  </span>
                )}
              </div>
            )}{' '}
          </div>

          <form className='mt-6'>
            <div className='owner'>
              <label className='flex' htmlFor='usernameId'>
                Owner name
              </label>
              <input
                className='text-gray-500'
                onChange={handleNameChange}
                type='text'
                name='username'
                id='usernameId'
              />
            </div>
            <div className='repo'>
              <label className='flex' htmlFor='repositoryId'>
                Repo name
              </label>
              <input
                className='text-gray-500'
                onChange={handleRepositoryChange}
                type='text'
                name='repository'
                id='repositoryId'
              />
            </div>
          </form>
          <button
            className='mt-6 p-3 px-9 bg-light-400 text-gray-500 rounded'
            onClick={handleSubmit}
          >
            Load
          </button>

          {loading && <div>Loading... </div>}
          {error && <div>Error </div>}
          {link && (
            <div className='mt-3'>
              <Link href={`/card/${link}`}>
                <a className='p-1 px-3 bg-gray-600 text-light-500 rounded'>
                  Here is your card {router.pathname}
                  {link}
                </a>
              </Link>{' '}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
