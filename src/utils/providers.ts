import { v4 as uuidv4 } from 'uuid';
import { TypeState, TypeAction } from '../types/providers';
import {
  EnumDisplayType,
  EnumSortDirection,
  EnumSortType,
} from '../types/todos';

export const reducer = (state: TypeState, action: TypeAction) => {
  switch (action.type) {
    case 'addTodo': {
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
    }
    case 'checkTodo': {
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
    }
    case 'toggleFilters': {
      return {
        ...state,
        showFilters: !state.showFilters,
      };
    }
    case 'changeSortType': {
      const { type } = action.payload;

      return {
        ...state,
        sort: {
          ...state.sort,
          type,
        },
      };
    }
    case 'changeSortDirection': {
      const { direction } = action.payload;

      return {
        ...state,
        sort: {
          ...state.sort,
          direction,
        },
      };
    }
    case 'filterDisplay': {
      const { displayType } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          displayType,
        },
      };
    }
    case 'filterTags': {
      const { tags } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          tags,
        },
      };
    }
    case 'changeColorScheme': {
      const { colorScheme } = action.payload;

      return {
        ...state,
        colorScheme,
      };
    }
    case 'deleteAllTodos': {
      return {
        ...state,
        todos: [],
      };
    }
    case 'resetApp': {
      return { ...initialState };
    }
    default: {
      return { ...state };
    }
  }
};

export const initialState: TypeState = {
  todos: [],
  sort: {
    type: EnumSortType.DateAdded,
    direction: EnumSortDirection.Descending,
  },
  filters: {
    displayType: EnumDisplayType.All,
    tags: [],
  },
  showFilters: false,
  colorScheme: 'dark',
};
