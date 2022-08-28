import { fireEvent, render, screen } from '@testing-library/react';
import flushPromises from 'flush-promises';
import { buildRenderWithRouter } from 'utils/test/build-render';
import MediaQueryResult from 'stubs/media-query-1.json';

import CollectionCard from './CollectionCard';

describe('CollectionCard', () => {
  const mediaCollection = {
    [MediaQueryResult.data.Media.idMal]: MediaQueryResult.data.Media,
  }

  test('Should be able to open and close delete modal', async () => {
    render(buildRenderWithRouter({
      path: '/collections',
      component: <CollectionCard collectionName="Prev Collection Name" mediaCollection={mediaCollection}/>,
    }));
    await flushPromises();

    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
    await flushPromises();
    expect(screen.getByText(/Delete Collection/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    await flushPromises();
    expect(screen.queryByText(/Delete Collection/i)).not.toBeInTheDocument();
  });

  test('Should be able to open and close edit modal', async () => {
    render(buildRenderWithRouter({
      path: '/collections/Prev Collection Name',
      component: <CollectionCard collectionName="Prev Collection Name" mediaCollection={mediaCollection}/>,
    }));
    await flushPromises();

    fireEvent.click(screen.getByRole('button', { name: /Edit/i }));
    await flushPromises();
    expect(screen.getByText(/Edit Prev Collection Name/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    await flushPromises();
    expect(screen.queryByText(/Delete Collection/i)).not.toBeInTheDocument();
  });
});
