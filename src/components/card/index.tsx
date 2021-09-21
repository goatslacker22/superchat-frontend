import { useLazyQuery, useMutation } from '@apollo/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import s from '@/styles/components/card.module.scss';

import { convertDate } from '@/../helpers/date';
import { REMOVE_STAR } from '@/graphQueries/mutations/removeStart';
import {
  RemoveStar,
  RemoveStarVariables,
} from '@/graphQueries/mutations/removeStart/__generated__/RemoveStar';
import { GET_REPO_DATA } from '@/graphQueries/repository';
import {
  GetRepoData,
  GetRepoDataVariables,
} from '@/graphQueries/repository/__generated__/GetRepoData';
import { ADD_STAR } from '@/graphQueries/star';
import {
  AddStar,
  AddStarVariables,
} from '@/graphQueries/star/__generated__/AddStar';

import { RepositoryType } from '@/types';
interface Props {
  repository: RepositoryType;
  color: string;
  icon: string;
}

interface Contributor {
  login: string;
  contributions: number;
}
const Card = (props: Props) => {
  const [getData, { data }] = useLazyQuery<GetRepoData, GetRepoDataVariables>(
    GET_REPO_DATA,
    { fetchPolicy: 'no-cache' }
  );
  const [addStar] = useMutation<AddStar, AddStarVariables>(ADD_STAR);
  const [removeStar] = useMutation<RemoveStar, RemoveStarVariables>(
    REMOVE_STAR
  );
  const [stars, setStars] = useState(data?.repository?.stargazerCount);
  const [contributors, setContributors] = useState<Contributor[] | null>(null);
  const handleAddStar = (e: React.MouseEvent) => {
    e.preventDefault();

    if (data?.repository) {
      addStar({
        variables: {
          input: {
            starrableId: data?.repository?.id,
            clientMutationId: props?.repository?.owner.id,
          },
        },
      }).then((res) => {
        if (res.data?.addStar?.starrable?.stargazerCount && !res.errors) {
          const updatedData = getData({
            variables: {
              name: props.repository.name,
              owner: props.repository.owner.login,
            },
          });

          setStars(res.data?.addStar?.starrable?.stargazerCount);
        }

        return res;
      });
    }
  };

  const handleRemoveStar = (e: React.MouseEvent) => {
    e.preventDefault();

    if (data?.repository) {
      removeStar({
        variables: {
          input: {
            starrableId: data?.repository?.id,
            clientMutationId: props?.repository?.owner.id,
          },
        },
      }).then((res) => {
        if (res.data?.removeStar?.starrable?.stargazerCount && !res.errors) {
          const updatedData = getData({
            variables: {
              name: props.repository.name,
              owner: props.repository.owner.login,
            },
          });

          setStars(res.data?.removeStar?.starrable?.stargazerCount);
        }

        return res;
      });
    }
  };

  useEffect(() => {
    getData({
      variables: {
        name: props.repository.name,
        owner: props.repository.owner.login,
      },
    });
  }, []);

  useEffect(() => {
    setStars(data?.repository?.stargazerCount);
    fetch(
      `https://api.github.com/repos/${data?.repository?.owner.login}/${data?.repository?.name}/contributors?page=1`
    )
      .then((response) => response.json())
      .then((data: []) => {
        setContributors(data);

        return data;
      });
  }, [data]);

  return (
    <div
      className={`${s.root} pt-12 bg-gray-500 min-w-20 mx-auto rounded-xl  items-center space-x-4`}
      style={{ boxShadow: `0px 2px 18px ${props?.color}` }}
    >
      <Link
        passHref={true}
        href={`https://github.com/${props.repository.owner.login}/${props.repository.name}`}
      >
        <a>
          <div className='flex justify-center items-center px-3'>
            <div
              className='p-14 rounded-full flex-shrink-0 bg-gray-400'
              style={{ boxShadow: `0px 0px 20px ${props?.color}` }}
            >
              <i
                className={`fa ${props.icon}`}
                style={{
                  color: props.color ?? 'red',
                }}
              ></i>
            </div>

            <div className='ml-3'>
              <div className='text-2xl'>
                {data?.repository
                  ? data?.repository.name
                  : props?.repository?.name}
              </div>
              <div className='flex mt-12'>
                <span className='mr-3'>Author:</span>
                {props?.repository?.owner.login}
              </div>
            </div>
          </div>
          <div className='mt-6 p-6'>{props?.repository?.description}</div>
          {contributors && (
            <div className='p-6 grid grid-cols-2'>
              {contributors?.length > 0
                ? contributors?.map((item, i) => {
                    if (i < 10) {
                      return (
                        <div className='text-xs mb-2' key={i}>
                          <div>
                            <Link
                              passHref={true}
                              href={`https://github.com/${item.login}`}
                            >
                              <a>
                                <span className='hover:text-primary-600'>
                                  @{item.login}
                                </span>
                              </a>
                            </Link>
                          </div>
                          <div>
                            <span>Contributions: #{item.contributions}</span>
                          </div>
                        </div>
                      );
                    }
                  })
                : null}
            </div>
          )}

          <div
            className={`${s.bottom} mt-6 p-6`}
            style={{ background: props.color }}
          >
            <div className='text-gray-500 text-md font-semibold flex justify-between items-center'>
              <button
                className={`${s.button} border border-black rounded`}
                onClick={
                  data?.repository?.viewerHasStarred
                    ? handleRemoveStar
                    : handleAddStar
                }
              >
                <span className='mr-3 font-semibold'>Star:</span>
                <i className='fa fa-star mr-2'></i>
                <span className='text-sm font-semibold'>{stars}</span>
              </button>

              {
                <div className='text-sm font-semibold'>
                  <i className='fa fa-eye mr-1'></i>{' '}
                  {data?.repository?.watchers?.totalCount}
                </div>
              }
              {
                <div className='text-sm font-semibold'>
                  <i className='fa fa-code-fork mr-1'></i>
                  {data?.repository?.forkCount}
                </div>
              }
            </div>
            {data?.repository?.createdAt && (
              <div className='text-gray-500 flex justify-end mt-6'>
                <span className='font-semibold mr-3'>Created at</span>{' '}
                {convertDate(data?.repository?.createdAt)}
              </div>
            )}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Card;
