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

  test('User can add to-do', async () => {
    const user = userEvent.setup();

    render(<App />);

    const textbox = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', {
      name: /add/i,
    });

    await user.type(textbox, 'Clean the kitchen');

    await user.click(addButton);

    const label = screen.getByLabelText(/clean the kitchen/i);

    expect(label).toBeInTheDocument();
  });
});
