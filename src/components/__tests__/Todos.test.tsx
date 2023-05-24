import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test';
import Todos from '../Todos';

describe('src/components/Todos', () => {
  test('message displays if no to-dos', () => {
    renderWithProviders(<Todos />);

    const text = screen.getByText(/no to-dos/i);

    expect(text).toBeInTheDocument();
  });
});
