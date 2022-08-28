import { fireEvent, render, screen } from '@testing-library/react';
import flushPromises from 'flush-promises';
import DeleteCollectionModal from './DeleteCollectionModal';
import { buildRenderWithRouter } from 'utils/test/build-render';

describe('DeleteCollectionModal', () => {
  const onDone = jest.fn();

  test('Call onDone if click done', async () => {
    render(buildRenderWithRouter({
      path: '/collections',
      component: <DeleteCollectionModal collectionName="Prev Collection Name" onDone={onDone} />,
    }));

    await flushPromises();

    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
    await flushPromises();
    expect(onDone).toHaveBeenCalled();
  });

  test('Call onDone if click cancel', async () => {
    jest.resetAllMocks();
    render(buildRenderWithRouter({
      path: '/collections',
      component: <DeleteCollectionModal collectionName="Prev Collection Name" onDone={onDone} />,
    }));

    await flushPromises();

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    await flushPromises();
    expect(onDone).toHaveBeenCalled();
  });
});
