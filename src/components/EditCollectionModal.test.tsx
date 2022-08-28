import { fireEvent, render, screen } from '@testing-library/react';
import flushPromises from 'flush-promises';
import EditCollectionModal from './EditCollectionModal';
import { buildRenderWithRouter } from 'utils/test/build-render';

describe('EditCollectionModal', () => {
  const onDone = jest.fn();

  test('Call onDone if click done', async () => {
    render(buildRenderWithRouter({
      path: '/collections/:id',
      component: <EditCollectionModal collectionName="Prev Collection Name" onDone={onDone} />,
    }));

    await flushPromises();

    fireEvent.change(screen.getByLabelText('Collection Name'), {target: {value: 'Next'}})
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));
    await flushPromises();
    expect(onDone).toHaveBeenCalled();
  });
});
