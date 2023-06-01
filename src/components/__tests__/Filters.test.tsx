import { screen } from '@testing-library/react';
import { mockStateShowFilters } from '../../utils/mockData';
import { renderWithProviders } from '../../utils/test';
import Filters from '../Filters';

describe('src/components/Filters', () => {
  test('Component renders', () => {
    renderWithProviders(<Filters />, mockStateShowFilters);

    const text = screen.getByText(/display type/i);

    expect(text).toBeInTheDocument();
  });
});
