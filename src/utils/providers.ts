import { v4 as uuidv4 } from 'uuid';
import { TypeState, TypeAction } from '../types/providers';
import { EnumShow, EnumSortDirection, EnumSortType } from '../types/todos';

export const reducer = (state: TypeState, action: TypeAction) => {
  switch (action.type) {
    case 'add':
      const { name, tags, dueDate } = action.payload;

      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: uuidv4(),
            dateAdded: new Date().toISOString(),
            name,
            done: false,
            tags,
            dueDate,
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
            dateUpdated: new Date().toISOString(),
          };
        }

        return todo;
      });

      return {
        ...state,
        todos: nextTodos,
      };

    case 'sortType':
      const { type } = action.payload;

      return {
        ...state,
        sort: {
          ...state.sort,
          type,
        },
      };

    case 'sortDirection':
      const { direction } = action.payload;

      return {
        ...state,
        sort: {
          ...state.sort,
          direction,
        },
      };

    case 'filterShow':
      const { show } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          show,
        },
      };

    default:
      return { ...state };
  }
};

export const initialState: TypeState = {
  todos: [],
  sort: {
    type: EnumSortType.DateAdded,
    direction: EnumSortDirection.Asc,
  },
  filters: {
    show: EnumShow.All,
    tags: [],
  },
};
