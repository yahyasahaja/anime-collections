import { render, screen } from '@testing-library/react';
import flushPromises from 'flush-promises';
import Button from './Button';

describe('Button', () => {
  test('Rendered the desired children', async () => {
    render(<Button>Button text</Button>);
    await flushPromises();
    expect(screen.getByRole('button', { name: /Button text/i })).toBeInTheDocument();
  });
});
