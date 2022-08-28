import { fireEvent, render, screen } from '@testing-library/react';
import flushPromises from 'flush-promises';
import AddCollectionModal from './AddCollectionModal';
import { buildRenderWithRouter } from 'utils/test/build-render';

describe('AddCollectionModal', () => {
  const onDone = jest.fn();

  test('Call onDone if click done', async () => {
    render(buildRenderWithRouter({
      path: '/animes/:id',
      component: <AddCollectionModal onDone={onDone} />,
    }));

    await flushPromises();

    fireEvent.change(screen.getByLabelText('New Collection'), {target: {value: 'test add'}})
    fireEvent.click(screen.getByRole('button', { name: /Add/i }));
    await flushPromises();
    expect(onDone).toHaveBeenCalled();
  });
});
