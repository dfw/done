import { screen, waitFor } from '@testing-library/react';
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
  test('Renders view mode', () => {
    renderWithProviders(<Todo todo={mockTodo} />);

    const label = screen.getByLabelText(/eat pizza/i);

    expect(label).toBeInTheDocument();
  });

  test('Menu trigger click opens and closes menu dropdown', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Todo todo={mockTodo} />);

    const menuButton = screen.getByRole('button');

    await user.click(menuButton);

    const menuDropdown = screen.getByRole('menu');

    expect(menuDropdown).toBeInTheDocument();

    await user.click(menuButton);

    expect(menuDropdown).not.toBeInTheDocument();
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
  test('Renders edit mode', () => {
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

  test('Cancel button click changes mode back to view', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Todo todo={mockTodo} initialMode="edit" />);

    const textbox = screen.getByRole('textbox');
    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    await user.click(cancelButton);

    expect(textbox).not.toBeInTheDocument();
  });

  // Add mode
  test('Renders add mode', () => {
    renderWithProviders(<Todo initialMode="add" />);

    const textbox = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', {
      name: /add/i,
    });

    expect(textbox).toHaveDisplayValue('');
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeDisabled();
  });

  test('Add button is enabled when there is a to-do name', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Todo initialMode="add" />);

    const textbox = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', {
      name: /add/i,
    });

    await user.type(textbox, 'Watch Mad Men');

    expect(addButton).toBeEnabled();
  });

  test('Tags button click opens and closes tags popover', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Todo todo={mockTodo} initialMode="edit" />);

    const tagsButton = screen.getByTestId('tags-button');

    await user.click(tagsButton);

    const tagsPopover = screen.getByTestId('tags-popover');

    expect(tagsPopover).toBeInTheDocument();

    await user.click(tagsButton);

    await waitFor(() => expect(tagsPopover).not.toBeInTheDocument());
  });

  test('Calendar button click opens and closes calendar popover', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Todo todo={mockTodo} initialMode="edit" />);

    const calendarButton = screen.getByTestId('calendar-button');

    await user.click(calendarButton);

    const calendarPopover = screen.getByTestId('calendar-popover');

    expect(calendarPopover).toBeInTheDocument();

    await user.click(calendarButton);

    await waitFor(() => expect(calendarPopover).not.toBeInTheDocument());
  });
});
