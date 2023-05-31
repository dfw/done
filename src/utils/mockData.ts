import { TypeState } from '../types/providers';
import { EnumTag, TypeTodo } from '../types/todos';
import { defaultState } from './providers';

export const mockTodo: TypeTodo = {
  id: '0ac353d1-5975-4bc2-9ef4-1ecc0w9df7b4',
  name: 'Eat pizza',
  done: false,
  tags: [],
  dateAdded: '2023-05-12T01:41:53.016Z',
  dueDate: null,
};

export const mockTodos: TypeTodo[] = [
  {
    id: '0ac213d1-5975-4bd2-9eh4-1ecc0w9df6b4',
    name: 'Call mom',
    done: false,
    tags: [EnumTag.Personal],
    dateAdded: '2022-12-25T01:41:53.016Z',
    dueDate: '2022-12-26T01:41:53.016Z',
  },
  {
    id: '0ac351d1-5974-4bc2-9ef3-1ecc0w8df7b4',
    name: 'Finish presentation',
    done: false,
    tags: [EnumTag.Work],
    dateAdded: '2023-02-12T01:41:53.016Z',
    dueDate: null,
  },
  {
    id: '0ac453d1-5955-4bc2-9gf4-1ecc0q9df7b4',
    name: 'Drink beer',
    done: true,
    tags: [EnumTag.Important],
    dateAdded: '2023-03-12T01:41:53.016Z',
    dueDate: '2023-03-12T01:41:53.016Z',
  },
  {
    id: '0ac353d1-5975-4bc2-9ef4-1ecc0w9df7b4',
    name: 'Eat pizza',
    done: true,
    tags: [EnumTag.Personal, EnumTag.Important],
    dateAdded: '2023-05-12T01:41:53.016Z',
    dueDate: '2023-05-24T01:41:53.016Z',
  },
];

export const mockStateShowFilters: TypeState = {
  ...defaultState,
  showFilters: true,
};

export const mockStateTodo: TypeState = {
  ...defaultState,
  todos: [mockTodo],
};

export const mockStateTodos: TypeState = {
  ...defaultState,
  todos: mockTodos,
};
