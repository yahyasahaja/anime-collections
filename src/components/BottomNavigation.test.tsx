import { render, screen } from '@testing-library/react';
import BottomNavigation from './BottomNavigation';
import { buildRenderWithRouter } from 'utils/test/build-render';

describe('BottomNavigation', () => {
  test('Renders bottom navigation title', () => {
    const routes = [
      {
        title: 'Anime',
        path: '/animes',
        icon: <div>icon 1</div>,
      },
      {
        title: 'Collections',
        path: '/collections',
        icon: <div>icon 2</div>,
      },
    ];

    render(buildRenderWithRouter({
      path: '/animes',
      component: <BottomNavigation routes={routes} />,
    }));

    const navigationTitle = screen.getByText(/Anime/i);
    expect(navigationTitle).toBeInTheDocument();
  });

  test('Renders selected icon correctly', () => {
    const routes = [
      {
        title: 'Anime',
        path: '/animes',
        icon: <div>icon 1</div>,
      },
      {
        title: 'Collections',
        path: '/collections',
        icon: <div>icon 2</div>,
        selectedIcon: <div>icon 2 selected</div>,
      },
    ];

    render(buildRenderWithRouter({
      path: '/collections',
      component: <BottomNavigation routes={routes} />,
    }));

    const selectedIcon = screen.getByText(/icon 2 selected/i);
    expect(selectedIcon).toBeInTheDocument();
  });
})

