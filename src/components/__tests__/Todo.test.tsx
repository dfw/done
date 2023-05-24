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

    const label = screen.getByText('Eat pizza');

    expect(label).toBeInTheDocument();
  });

  test('Menu trigger click opens and closes menu dropdown', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Todo todo={mockTodo} />);

    const menuButton = screen.getByTestId('todo-menu-button');

    await user.click(menuButton);

    const menuDropdown = screen.getByRole('menu');

    expect(menuDropdown).toBeInTheDocument();

    await user.click(menuButton);

    expect(menuDropdown).not.toBeInTheDocument();
  });

  test('Edit button click changes mode to edit', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Todo todo={mockTodo} />);

    const menuButton = screen.getByTestId('todo-menu-button');

    await user.click(menuButton);

    const editButton = screen.getByRole('menuitem', { name: /edit/i });

    await user.click(editButton);

    const textbox = screen.getByRole('textbox');

    expect(textbox).toBeInTheDocument();
  });

  // test('delete button click deletes todo', async () => {
  //   const user = userEvent.setup();
  //   renderWithProviders(<Todo todo={mockTodo} />);

  //   const label = screen.getByText('Eat pizza');
  //   const menuButton = screen.getByRole('button');

  //   await user.click(menuButton);

  //   const deleteButton = screen.getByRole('menuitem', { name: /delete/i });

  //   await user.click(deleteButton);

  //   expect(label).not.toBeInTheDocument();
  // });

  // Edit mode
  test('Renders edit mode', () => {
    renderWithProviders(<Todo todo={mockTodo} initialMode="edit" />);

    const textbox = screen.getByRole('textbox');
    const saveButton = screen.getByRole('button', {
      name: 'Save',
    });
    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    expect(textbox).toHaveValue('Eat pizza');
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test('Cancel button click changes mode back to view', async () => {
    const user = userEvent.setup();

    renderWithProviders(<Todo todo={mockTodo} initialMode="edit" />);

    const textbox = screen.getByRole('textbox');
    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    await user.click(cancelButton);

    expect(textbox).not.toBeInTheDocument();
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

  // test('todo can be edited', async () => {
  //   const user = userEvent.setup();
  //   renderWithProviders(<Todo initialMode="edit" todo={mockTodo} />);

  //   const textbox = screen.getByRole('textbox');
  //   const saveButton = screen.getByRole('button', {
  //     name: /save/i,
  //   });

  //   await user.type(textbox, 'Call mom');

  //   await user.click(saveButton);

  //   await waitFor(() => {
  //     const label = screen.getByText('Call mom');
  //     expect(label).not.toBeInTheDocument();
  //   });
  // });

  // Add mode
  test('Renders add mode', () => {
    renderWithProviders(<Todo initialMode="add" />);

    const textbox = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', {
      name: /add/i,
    });

    expect(textbox).toHaveValue('');
    expect(addButton).toBeInTheDocument();
  });
});
