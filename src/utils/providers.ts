import { v4 as uuidv4 } from 'uuid';
import { TypeState, TypeAction } from '../types/providers';

export const reducer = (state: TypeState, action: TypeAction) => {
  switch (action.type) {
    case 'add':
      const { name, tags } = action.payload;

      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: uuidv4(),
            name,
            done: false,
            tags,
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

export const initialState: TypeState = {
  todos: [],
};
