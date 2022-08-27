import { render, screen } from '@testing-library/react';
import AnimeList from './AnimeList';
import { buildRenderWithRouter } from 'utils/test/build-render';

describe('AnimeList', () => {
  test('Renders AnimeCard', () => {
    render(buildRenderWithRouter({
      path: '/animes',
      component: <AnimeList />,
    }));

    const mediaCard1 = screen.getByText(/Media 1/i);
    expect(mediaCard1).toBeInTheDocument();
  });
})

