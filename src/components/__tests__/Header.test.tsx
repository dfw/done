import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockStateTodo } from '../../utils/mockData';
import { renderWithProviders } from '../../utils/test';
import Header from '../Header';

describe('src/components/Header', () => {
  beforeEach(() => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserver: jest.fn(),
      disconnect: jest.fn(),
    }));

    window.localStorage.clear();
  });

  test('Component renders', () => {
    renderWithProviders(<Header />);

    const heading = screen.getByRole('heading', { name: /done/i });

    expect(heading).toBeInTheDocument();
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

    renderWithProviders(<Header />, mockStateTodo);

    const menuButton = screen.getByRole('button');

    await user.click(menuButton);

    const deleteButton = screen.getByRole('menuitem', { name: /delete/i });

    expect(deleteButton).toBeEnabled();
  });
});
