import { fireEvent, render, screen } from '@testing-library/react';
import flushPromises from 'flush-promises';
import AddAnimeToCollectionModal from './AddAnimeToCollectionModal';
import { buildRenderWithRouter } from 'utils/test/build-render';

import MediaQueryResult from 'stubs/media-query-1.json';

describe('AddAnimeToCollectionModal', () => {
  const onDone = jest.fn();

  test('Call onDone if click done', async () => {
    render(buildRenderWithRouter({
      path: '/animes/:id',
      component: <AddAnimeToCollectionModal onDone={onDone} medias={[MediaQueryResult.data.Media]} />,
    }));

    await flushPromises();

    const doneButton = screen.getByText(/Done/i);
    doneButton.click();
    await flushPromises();
    expect(onDone).toHaveBeenCalled();
  });

  test('Able to add new collection', async () => {
    render(buildRenderWithRouter({
      path: '/animes',
      component: <AddAnimeToCollectionModal onDone={onDone} medias={[MediaQueryResult.data.Media]} />,
    }));

    fireEvent.change(screen.getByLabelText('New Collection'), {target: {value: 'test new'}})
    fireEvent.click(screen.getByText(/save/i));

    expect(await screen.findByText('test new')).toBeInTheDocument();
  });

  test('Able to add anime to existing collection', async () => {
    render(buildRenderWithRouter({
      path: '/animes',
      component: <AddAnimeToCollectionModal onDone={onDone} medias={[MediaQueryResult.data.Media]} />,
    }));

    fireEvent.click(await screen.findByText('test new'));
    await flushPromises();
    expect(screen.queryByTestId('checked-icon')).not.toBeInTheDocument();
    fireEvent.click(await screen.findByText('test new'));
    await flushPromises();
    expect(screen.getByTestId('checked-icon')).toBeInTheDocument();
  });
});
