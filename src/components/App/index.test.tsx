import { render, screen } from '@testing-library/react';
import App from '.';

test('renders app', () => {
  render(<App />);
  const linkElement = screen.getByText(/done/i);
  expect(linkElement).toBeInTheDocument();
});
