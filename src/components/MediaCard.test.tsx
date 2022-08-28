import { fireEvent, render, screen } from '@testing-library/react';
import flushPromises from 'flush-promises';
import { buildRenderWithRouter } from 'utils/test/build-render';
import MediaQueryResult from 'stubs/media-query-1.json';

import MediaCard from './MediaCard';

describe('MediaCard', () => {
  const media = MediaQueryResult.data.Media;

  test('Should be able to open and close delete modal', async () => {
    render(buildRenderWithRouter({
      path: '/collections',
      component: <MediaCard media={media} collectionName="collection name" hasDeleteButton={true}/>,
    }));
    await flushPromises();

    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
    await flushPromises();
    expect(screen.getByText(/Remove Anime from Collection/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    await flushPromises();
    expect(screen.queryByText(/Remove Anime from Collection/i)).not.toBeInTheDocument();
  });
});
