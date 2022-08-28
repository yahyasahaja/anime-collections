import { fireEvent, render, screen } from '@testing-library/react';
import flushPromises from 'flush-promises';
import { buildRenderWithRouter } from 'utils/test/build-render';

import DeleteMediaFromCollectionModal from './DeleteMediaFromCollectionModal';

import MediaQueryResult from 'stubs/media-query-1.json';

describe('DeleteMediaFromCollectionModal', () => {
  const onDone = jest.fn();
  const media = MediaQueryResult.data.Media;

  test('Call onDone if click done', async () => {
    render(buildRenderWithRouter({
      path: '/collections/Prev Collection Name',
      component: <DeleteMediaFromCollectionModal media={media} collectionName="Prev Collection Name" onDone={onDone} />,
    }));
    await flushPromises();

    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
    await flushPromises();
    expect(onDone).toHaveBeenCalled();
  });

  test('Call onDone if click cancel', async () => {
    jest.resetAllMocks();
    render(buildRenderWithRouter({
      path: '/collections/Prev Collection Name',
      component: <DeleteMediaFromCollectionModal media={media} collectionName="Prev Collection Name" onDone={onDone} />,
    }));

    await flushPromises();

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    await flushPromises();
    expect(onDone).toHaveBeenCalled();
  });
});
