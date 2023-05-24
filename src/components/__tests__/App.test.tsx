import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('src/components/App', () => {
  beforeEach(() => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserver: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  // Header
  test('User can show and hide filters', async () => {
    const user = userEvent.setup();

    render(<App />);

    const menuButton = screen.getByTestId('app-menu-button');

    await user.click(menuButton);

    const toggleFiltersButton = screen.getByRole('menuitem', {
      name: /show filters/i,
    });

    await user.click(toggleFiltersButton);

    const filtersComponent = screen.getByTestId('filters-component');

    expect(filtersComponent).toBeInTheDocument();

    // await user.click(toggleFiltersButton);

    // expect(filtersComponent).not.toBeInTheDocument();
  });

  // Filter tests

  // Header tests

  // Todo tests
});
