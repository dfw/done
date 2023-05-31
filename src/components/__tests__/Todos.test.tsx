import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test';
import { mockStateTodo } from '../../utils/mockData';
import Todos from '../Todos';

describe('src/components/Todos', () => {
  beforeEach(() => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserver: jest.fn(),
      disconnect: jest.fn(),
    }));

    window.localStorage.clear();
  });

  test('Message displays if no to-dos', () => {
    renderWithProviders(<Todos />);

    const text = screen.getByText(/no to-dos/i);

    expect(text).toBeInTheDocument();
  });

  test('User can edit to-do', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Todos />, mockStateTodo);

    const menuButton = screen.getByRole('button');

    await user.click(menuButton);

    const editButton = screen.getByRole('menuitem', { name: /edit/i });

    await user.click(editButton);

    const textbox = screen.getByRole('textbox');
    const saveButton = screen.getByRole('button', { name: /save/i });

    await user.clear(textbox);

    await user.type(textbox, 'Drink beer');

    await user.click(saveButton);

    const label = screen.getByLabelText(/drink beer/i);

    expect(label).toBeInTheDocument();
  });

  test('User can delete to-do', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Todos />, mockStateTodo);

    const label = screen.getByLabelText(/eat pizza/i);
    const menuButton = screen.getByRole('button');

    expect(label).toBeInTheDocument();

    await user.click(menuButton);

    const deleteButton = screen.getByRole('menuitem', { name: /delete/i });

    await user.click(deleteButton);

    expect(label).not.toBeInTheDocument();
  });
});
