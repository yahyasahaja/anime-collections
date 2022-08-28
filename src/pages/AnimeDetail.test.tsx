import { fireEvent, render, screen } from '@testing-library/react';

// local dependencies
import { buildRenderWithRouter } from 'utils/test/build-render';

// main component
import AnimeDetail, { MEDIA_QUERY } from './AnimeDetail';

// tubs
import mediaQueryResult from 'stubs/media-query-1.json';

describe('AnimeDetail', () => {
  test('Renders Anime Detail, open, and close the add to collection modal', async () => {
    render(buildRenderWithRouter({
      path: '/animes/1',
      component: <AnimeDetail />,
      mocks: [
        {
          request: {
            query: MEDIA_QUERY,
            variables: {
              idMal: '1',
            }
          },
          result: mediaQueryResult
        },
      ],
    }));

    expect(await screen.findByText('Cowboy Bebop')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Add to collection'));
    expect(await screen.findByText('Add Anime to Collection')).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Done/i));
    expect(screen.queryByText('Add Anime to Collection')).not.toBeInTheDocument();
  });
  test('Add to collections and render in the page', async () => {
    render(buildRenderWithRouter({
      path: '/animes/1',
      component: <AnimeDetail />,
      mocks: [
        {
          request: {
            query: MEDIA_QUERY,
            variables: {
              idMal: '1',
            }
          },
          result: mediaQueryResult
        },
      ],
    }));

    expect(await screen.findByText('Cowboy Bebop')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Add to collection'));
    expect(await screen.findByText('Add Anime to Collection')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('New Collection'), {target: {value: 'test new'}})
    fireEvent.click(screen.getByText(/save/i));
    expect(await screen.findByText('test new')).toBeInTheDocument();
  });
});
