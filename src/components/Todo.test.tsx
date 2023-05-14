import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../utils/test';
import Todo from './Todo';

const mockTodo = {
  id: '0ac353d1-5975-4bc2-9ef4-1ecc0w9df7b4',
  name: 'Eat pizza',
  done: false,
  tags: [],
  dateAdded: '2023-05-12T01:41:53.016Z',
  dueDate: null,
};

describe('src/components/Todo', () => {
  beforeEach(() => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserver: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  // View mode
  test('renders view mode', () => {
    renderWithProviders(<Todo todo={mockTodo} />);

    const label = screen.getByText('Eat pizza');

    expect(label).toBeInTheDocument();
  });

  test('menu trigger click opens and closes menu dropdown', async () => {
    renderWithProviders(<Todo todo={mockTodo} />);

    const menuButton = screen.getByRole('button');

    fireEvent.click(menuButton);

    const editButton = screen.getByRole('menuitem', { name: 'Edit' });
    const deleteButton = screen.getByRole('menuitem', { name: 'Delete' });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(menuButton);

    await waitFor(() => expect(editButton).not.toBeInTheDocument());
    expect(deleteButton).not.toBeInTheDocument();
  });

  test('edit button click changes mode to edit', () => {
    renderWithProviders(<Todo todo={mockTodo} />);

    const menuButton = screen.getByRole('button');

    fireEvent.click(menuButton);

    const editButton = screen.getByRole('menuitem', { name: 'Edit' });

    fireEvent.click(editButton);

    const textbox = screen.getByRole('textbox');

    expect(textbox).toBeInTheDocument();
  });

  // Edit mode
  test('renders edit mode', () => {
    renderWithProviders(<Todo todo={mockTodo} initialMode="edit" />);

    const textbox = screen.getByRole('textbox');
    const saveButton = screen.getByRole('button', {
      name: 'Save',
    });
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    expect(textbox).toHaveValue('Eat pizza');
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test('cancel button click changes mode back to view', () => {
    renderWithProviders(<Todo todo={mockTodo} initialMode="edit" />);

    const textbox = screen.getByRole('textbox');
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    fireEvent.click(cancelButton);

    expect(textbox).not.toBeInTheDocument();
  });

  test('tags button click opens and closes tags popover', async () => {
    renderWithProviders(<Todo todo={mockTodo} initialMode="edit" />);

    const tagsButton = screen.getByTestId('tags-button');

    fireEvent.click(tagsButton);

    const tagsPopover = screen.getByTestId('tags-popover');

    expect(tagsPopover).toBeInTheDocument();

    fireEvent.click(tagsButton);

    await waitFor(() => expect(tagsPopover).not.toBeInTheDocument());
  });

  test('calendar button click opens and closes calendar popover', async () => {
    renderWithProviders(<Todo todo={mockTodo} initialMode="edit" />);

    const calendarButton = screen.getByTestId('calendar-button');

    fireEvent.click(calendarButton);

    const calendarPopover = screen.getByTestId('calendar-popover');

    expect(calendarPopover).toBeInTheDocument();

    // fireEvent.click(calendarButton);

    // await waitFor(() => expect(calendarPopover).not.toBeInTheDocument());
  });

  test('renders add mode', () => {
    renderWithProviders(<Todo initialMode="add" />);

    const textbox = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', {
      name: 'Add',
    });

    expect(textbox).toHaveValue('');
    expect(addButton).toBeInTheDocument();
  });
});
