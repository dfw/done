import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockStateTodo } from '../../utils/mockData';
import App from '../App';

describe('src/components/App', () => {
  beforeEach(() => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserver: jest.fn(),
      disconnect: jest.fn(),
    }));

    window.localStorage.clear();
  });

  test('User can add to-do', async () => {
    const user = userEvent.setup();

    render(<App />);

    const textbox = screen.getByRole('textbox');
    const button = screen.getByRole('button', {
      name: /add/i,
    });

    await user.type(textbox, 'Clean the kitchen');

    await user.click(button);

    const label = screen.getByLabelText(/clean the kitchen/i);

    expect(label).toBeInTheDocument();
  });

  test('User can edit to-do', async () => {
    const user = userEvent.setup();

    render(<App initialState={mockStateTodo} />);

    const todoGroup = screen.getByTestId('todo-group');

    const menuButton = within(todoGroup).getByRole('button');

    await user.click(menuButton);

    const editButton = within(todoGroup).getByRole('menuitem', {
      name: /edit/i,
    });

    await user.click(editButton);

    const todoForms = screen.getAllByTestId('todo-form');
    const textbox = within(todoForms[1]).getByRole('textbox');
    const saveButton = within(todoForms[1]).getByRole('button', {
      name: /save/i,
    });

    await user.clear(textbox);

    await user.type(textbox, 'Drink beer');

    await user.click(saveButton);

    const label = screen.getByLabelText(/drink beer/i);

    expect(label).toBeInTheDocument();
  }, 6000);

  test('User can delete to-do', async () => {
    const user = userEvent.setup();

    render(<App initialState={mockStateTodo} />);

    const todoGroup = screen.getByTestId('todo-group');
    const label = screen.getByLabelText(/eat pizza/i);
    const menuButton = within(todoGroup).getByRole('button');

    expect(label).toBeInTheDocument();

    await user.click(menuButton);

    const deleteButton = within(todoGroup).getByRole('menuitem', {
      name: /delete/i,
    });

    await user.click(deleteButton);

    expect(label).not.toBeInTheDocument();
  }, 6000);
});
