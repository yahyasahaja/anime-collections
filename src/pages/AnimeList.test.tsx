import { fireEvent, render, screen } from '@testing-library/react';
import flushPromises from 'flush-promises';
import AnimeList, { PAGE_MEDIA_QUERY } from './AnimeList';
import { buildRenderWithRouter } from 'utils/test/build-render';
import { PAGE_LIMIT } from 'configs/constants';
import pageMediaQueryResult from 'stubs/page-media-query-1.json';
import React from 'react';

jest.mock('react-infinite-scroll-component', () => ({ children, next, loader}:
  { children: React.ReactNode, dataLength?: number, next: () => void, hasMore?: boolean, loader: React.ReactNode }) => {
  return <div>{children}<button onClick={next}>next test</button></div>
})

describe('AnimeList', () => {
  test('Renders AnimeCard and refetch', async () => {
    render(buildRenderWithRouter({
      path: '/animes',
      component: <AnimeList />,
      mocks: [
        {
          request: {
            query: PAGE_MEDIA_QUERY,
            variables: {
              page: 1,
              perPage: PAGE_LIMIT,
            }
          },
          result: pageMediaQueryResult
        },
        {
          request: {
            query: PAGE_MEDIA_QUERY,
            variables: {
              page: 2,
              perPage: PAGE_LIMIT,
            }
          },
          result: pageMediaQueryResult
        },
      ],
    }));

    expect(await screen.findByText('Cowboy Bebop')).toBeInTheDocument();

    await flushPromises();
    fireEvent.click(screen.getByText('next test'));
    await flushPromises();
    expect(screen.getAllByRole('img').length).toBe(21); // + loading image
  });
});
