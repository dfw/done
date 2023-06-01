import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('src/components/Footer', () => {
  test('Component renders', () => {
    render(<Footer />);

    const text = screen.getByText(/david weiss/i);

    expect(text).toBeInTheDocument();
  });
});
