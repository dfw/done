import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test';
import Header from '../Header';
import { mockTodo } from '../../utils/mockData';
import { defaultState } from '../../utils/providers';

describe('src/components/Header', () => {
  beforeEach(() => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserver: jest.fn(),
      disconnect: jest.fn(),
    }));

    window.localStorage.clear();
  });

  test('Component renders', async () => {
    renderWithProviders(<Header />);

    const h1 = screen.getByRole('heading', { name: /done/i });

    expect(h1).toBeInTheDocument();
  });

  test('Menu trigger click opens and closes menu dropdown', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Header />);

    const menuButton = screen.getByRole('button');

    await user.click(menuButton);

    const menuDropdown = screen.getByRole('menu');

    expect(menuDropdown).toBeInTheDocument();

    await user.click(menuButton);

    expect(menuDropdown).not.toBeInTheDocument();
  });

  test('User can toggle dark mode', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Header />);

    const menuButton = screen.getByRole('button');

    await user.click(menuButton);

    const menuDropdown = screen.getByRole('menu');

    expect(menuDropdown).toHaveStyle({
      backgroundColor: '#25262b',
    });

    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);

    expect(menuDropdown).toHaveStyle({
      backgroundColor: '#fff',
    });
  });

  test('Delete button is disabled when there are no to-dos', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Header />);

    const menuButton = screen.getByRole('button');

    await user.click(menuButton);

    const deleteButton = screen.getByRole('menuitem', { name: /delete/i });

    expect(deleteButton).toBeDisabled();
  });

  test('Delete button is enabled when there are to-dos', async () => {
    const user = userEvent.setup();

    const todoProviderProps = {
      ...defaultState,
      todos: [mockTodo],
    };

    renderWithProviders(<Header />, todoProviderProps);

    const menuButton = screen.getByRole('button');

    await user.click(menuButton);

    const deleteButton = screen.getByRole('menuitem', { name: /delete/i });

    expect(deleteButton).toBeEnabled();
  });
});
