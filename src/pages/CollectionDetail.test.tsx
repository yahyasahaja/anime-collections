import { render, screen } from '@testing-library/react';
import flushPromises from 'flush-promises';
import { buildRenderWithRouter } from 'utils/test/build-render';

import { localForageCollectionsStore } from 'stores/collections';

import CollectionDetail from './CollectionDetail';
import MediaQueryResult from 'stubs/media-query-1.json';

describe('CollectionDetail', () => {
  const collectionName = 'collection detail test';
  const media = MediaQueryResult.data.Media;
  const mediaCollection = {
    [media.idMal]: media,
  }

  test('should be able to show the empty collection', async () => {
    localForageCollectionsStore.setItem(collectionName, {});

    render(buildRenderWithRouter({
      path: `/collections/${collectionName}`,
      component: <CollectionDetail />,
    }));
    await flushPromises();

    expect(await screen.findByText(/empty/i)).toBeInTheDocument();
  });

  test('Should be able to show MediaCard', async () => {
    localForageCollectionsStore.setItem(collectionName, mediaCollection);

    render(buildRenderWithRouter({
      path: `/collections/${collectionName}`,
      component: <CollectionDetail />,
    }));
    await flushPromises();

    expect(await screen.findByText(/Cowboy Bebop/i)).toBeInTheDocument();
  });
});
