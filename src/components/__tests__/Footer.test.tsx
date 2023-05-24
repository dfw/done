import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('src/components/Footer', () => {
  test('Component renders', () => {
    render(<Footer />);

    const footerText = screen.getByText(/David Weiss/);

    expect(footerText).toBeInTheDocument();
  });
});
