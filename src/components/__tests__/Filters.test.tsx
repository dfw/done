import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockStateShowFilters } from '../../utils/mockData';
import { renderWithProviders } from '../../utils/test';
import Filters from '../Filters';

describe('src/components/Filters', () => {
  test('Component renders', () => {
    renderWithProviders(<Filters />, mockStateShowFilters);

    const text = screen.getByText(/display type/i);

    expect(text).toBeInTheDocument();
  });

  test('Sort panel displays on sort tab click', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Filters />, mockStateShowFilters);

    const sortTab = screen.getByRole('tab', { name: /sort/i });

    await user.click(sortTab);

    const tabPanel = screen.getByRole('tabpanel');

    const text = within(tabPanel).getByText(/sort by/i);

    expect(text).toBeInTheDocument();
  });

  test('Filters panel displays on filters tab click', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Filters />, mockStateShowFilters);

    const sortTab = screen.getByRole('tab', { name: /sort/i });
    const filtersTab = screen.getByRole('tab', { name: /filters/i });

    await user.click(sortTab);

    await user.click(filtersTab);

    const tabPanel = screen.getByRole('tabpanel');
    const text = within(tabPanel).getByText(/display type/i);

    expect(text).toBeInTheDocument();
  });
});
