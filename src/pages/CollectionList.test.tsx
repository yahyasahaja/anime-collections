import { fireEvent, render, screen } from '@testing-library/react';
import flushPromises from 'flush-promises';
import { buildRenderWithRouter } from 'utils/test/build-render';

import CollectionList from './CollectionList';

describe('CollectionList', () => {
  test('Should be able to open and close add new collection modal', async () => {
    render(buildRenderWithRouter({
      path: '/collections',
      component: <CollectionList />,
    }));
    await flushPromises();

    fireEvent.click(screen.getByTestId('add-collection-btn'));
    expect(await screen.findByLabelText('New Collection')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('New Collection'), {target: {value: 'test add'}})
    fireEvent.click(screen.getByRole('button', { name: /Add/i }));
    await flushPromises();

    expect(screen.queryByLabelText('New Collection')).not.toBeInTheDocument();
  });
});
