import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test';
import { mockTodo } from '../../utils/mockData';
import Todo from '../Todo';

describe('src/components/Todo', () => {
  beforeEach(() => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserver: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  // View mode
  test('Component renders in view mode', () => {
    renderWithProviders(<Todo todo={mockTodo} />);

    const label = screen.getByLabelText(/eat pizza/i);

    expect(label).toBeInTheDocument();
  });

  test('Edit button click changes mode to edit', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Todo todo={mockTodo} />);

    const menuButton = screen.getByRole('button');

    await user.click(menuButton);

    const editButton = screen.getByRole('menuitem', { name: /edit/i });

    await user.click(editButton);

    const textbox = screen.getByRole('textbox');

    expect(textbox).toBeInTheDocument();
  });

  // Edit mode
  test('Component renders in edit mode', () => {
    renderWithProviders(<Todo todo={mockTodo} initialMode="edit" />);

    const textbox = screen.getByRole('textbox');
    const saveButton = screen.getByRole('button', {
      name: /save/i,
    });
    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    expect(textbox).toHaveDisplayValue(/eat pizza/i);
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test('Save button is disabled when there is no to-do name', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Todo todo={mockTodo} initialMode="edit" />);

    const textbox = screen.getByRole('textbox');
    const saveButton = screen.getByRole('button', {
      name: /save/i,
    });

    await user.clear(textbox);

    expect(textbox).toHaveDisplayValue('');
    expect(saveButton).toBeDisabled();
  });

  test('Cancel button click changes back to view mode', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Todo todo={mockTodo} initialMode="edit" />);

    const textbox = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /cancel/i });

    await user.click(button);

    expect(textbox).not.toBeInTheDocument();
  });

  // Add mode
  test('Component renders in add mode', () => {
    renderWithProviders(<Todo initialMode="add" />);

    const textbox = screen.getByRole('textbox');
    const button = screen.getByRole('button', {
      name: /add/i,
    });

    expect(textbox).toHaveDisplayValue('');
    expect(button).toBeInTheDocument();
  });

  test('Add button is enabled when there is a to-do name', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Todo initialMode="add" />);

    const textbox = screen.getByRole('textbox');
    const button = screen.getByRole('button', {
      name: /add/i,
    });

    expect(button).toBeDisabled();

    await user.type(textbox, 'Watch Mad Men');

    expect(button).toBeEnabled();
  });
});
