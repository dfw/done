import { v4 as uuidv4 } from 'uuid';
import { TodosState, TodosAction } from './types';

export const todosReducer = (state: TodosState, action: TodosAction) => {
  switch (action.type) {
    case 'add':
      const { text } = action.payload;

      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: uuidv4(),
            text,
            done: false,
          },
        ],
      };

    case 'check':
      const { id, done } = action.payload;
      const nextTodos = state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            done,
          };
        }

        return todo;
      });

      return {
        ...state,
        todos: nextTodos,
      };

    default:
      return { ...state };
  }
};

export const initialTodosReducerState: TodosState = {
  todos: [],
};
