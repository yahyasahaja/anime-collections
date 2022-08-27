import { render, screen } from '@testing-library/react';
import AnimeList, { PAGE_MEDIA_QUERY } from './AnimeList';
import { buildRenderWithRouter } from 'utils/test/build-render';
import { PAGE_LIMIT } from 'configs/constants';
import pageMediaQueryResult from 'stubs/page-media-query-1.json';

describe('AnimeList', () => {
  test('Renders AnimeCard', async () => {
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
        }
      ],
    }));

    expect(await screen.findByText('Cowboy Bebop')).toBeInTheDocument();
  });
})

