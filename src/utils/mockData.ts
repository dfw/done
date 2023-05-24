import { TypeState } from '../types/providers';
import { defaultState } from './providers';

export const mockTodo = {
  id: '0ac353d1-5975-4bc2-9ef4-1ecc0w9df7b4',
  name: 'Eat pizza',
  done: false,
  tags: [],
  dateAdded: '2023-05-12T01:41:53.016Z',
  dueDate: null,
};

export const mockStateShowFilters: TypeState = {
  ...defaultState,
  showFilters: true,
};
