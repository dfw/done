import { filterTodos, sortTodos } from '../todos';
import { mockTodos } from '../mockData';
import {
  EnumDisplayType,
  EnumSortDirection,
  EnumSortType,
  EnumTag,
} from '../../types/todos';

describe('src/utils/todos', () => {
  describe('filterTodos', () => {
    test('Return all to-dos', () => {
      const todos = filterTodos(mockTodos, EnumDisplayType.All, []);

      expect(todos).toHaveLength(4);
    });

    test('Return done to-dos', () => {
      const todos = filterTodos(mockTodos, EnumDisplayType.Done, []);

      expect(todos).toHaveLength(2);
      expect(todos[0].name).toEqual('Drink beer');
      expect(todos[1].name).toEqual('Eat pizza');
    });

    test('Return not done to-dos', () => {
      const todos = filterTodos(mockTodos, EnumDisplayType.NotDone, []);

      expect(todos).toHaveLength(2);
      expect(todos[0].name).toEqual('Call mom');
      expect(todos[1].name).toEqual('Finish presentation');
    });

    test('Return `important` to-dos', () => {
      const todos = filterTodos(mockTodos, EnumDisplayType.All, [
        EnumTag.Important,
      ]);

      expect(todos).toHaveLength(2);
      expect(todos[0].name).toEqual('Drink beer');
      expect(todos[1].name).toEqual('Eat pizza');
    });

    test('Return `work` to-dos', () => {
      const todos = filterTodos(mockTodos, EnumDisplayType.All, [EnumTag.Work]);

      expect(todos).toHaveLength(1);
      expect(todos[0].name).toEqual('Finish presentation');
    });

    test('Return `personal` and `important` to-dos', () => {
      const todos = filterTodos(mockTodos, EnumDisplayType.All, [
        EnumTag.Personal,
        EnumTag.Important,
      ]);

      expect(todos).toHaveLength(3);
      expect(todos[0].name).toEqual('Call mom');
      expect(todos[1].name).toEqual('Drink beer');
      expect(todos[2].name).toEqual('Eat pizza');
    });

    test('Return not done `personal` to-dos', () => {
      const todos = filterTodos(mockTodos, EnumDisplayType.NotDone, [
        EnumTag.Personal,
      ]);

      expect(todos).toHaveLength(1);
      expect(todos[0].name).toEqual('Call mom');
    });

    test('Return `shopping` to-dos', () => {
      const todos = filterTodos(mockTodos, EnumDisplayType.All, [
        EnumTag.Shopping,
      ]);

      expect(todos).toHaveLength(0);
    });
  });

  describe('sortTodos', () => {
    test('Throws invalid sort type error', () => {
      const todos = () =>
        // @ts-ignore-error
        sortTodos(mockTodos, 'foo', EnumSortDirection.Ascending);

      expect(todos).toThrowError('Invalid sort type');
    });

    test('Sorts by date added ASC', () => {
      const todos = sortTodos(
        mockTodos,
        EnumSortType.DateAdded,
        EnumSortDirection.Ascending
      );

      expect(todos[0].name).toEqual('Call mom');
      expect(todos[1].name).toEqual('Finish presentation');
      expect(todos[2].name).toEqual('Drink beer');
      expect(todos[3].name).toEqual('Eat pizza');
    });

    test('Sorts by date added DESC', () => {
      const todos = sortTodos(
        mockTodos,
        EnumSortType.DateAdded,
        EnumSortDirection.Descending
      );

      expect(todos[0].name).toEqual('Eat pizza');
      expect(todos[1].name).toEqual('Drink beer');
      expect(todos[2].name).toEqual('Finish presentation');
      expect(todos[3].name).toEqual('Call mom');
    });

    test('Sorts by due date ASC', () => {
      const todos = sortTodos(
        mockTodos,
        EnumSortType.DueDate,
        EnumSortDirection.Ascending
      );

      expect(todos[0].name).toEqual('Call mom');
      expect(todos[1].name).toEqual('Drink beer');
      expect(todos[2].name).toEqual('Eat pizza');
      expect(todos[3].name).toEqual('Finish presentation');
    });

    test('Sorts by due date DESC', () => {
      const todos = sortTodos(
        mockTodos,
        EnumSortType.DueDate,
        EnumSortDirection.Descending
      );

      expect(todos[0].name).toEqual('Eat pizza');
      expect(todos[1].name).toEqual('Drink beer');
      expect(todos[2].name).toEqual('Call mom');
      expect(todos[3].name).toEqual('Finish presentation');
    });
  });
});
