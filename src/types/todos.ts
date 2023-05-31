export enum EnumTag {
  Personal = 'personal',
  Work = 'work',
  Shopping = 'shopping',
  Errand = 'errand',
  Home = 'home',
  Important = 'important',
}

export enum EnumSortType {
  DateAdded = 'dateAdded',
  DueDate = 'dueDate',
}

export enum EnumSortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

export enum EnumDisplayType {
  All = 'all',
  NotDone = 'not-done',
  Done = 'done',
}

export type TypeTodo = {
  id: string;
  name: string;
  done: boolean;
  tags: EnumTag[];
  dateAdded: string;
  dueDate: string | null;
};

export type TypeAddTodoPayload = Pick<TypeTodo, 'name' | 'tags' | 'dueDate'>;

export type TypeUpdateTodoPayload = Pick<
  TypeTodo,
  'id' | 'name' | 'tags' | 'dueDate'
>;

export type TypeCheckTodoPayload = Pick<TypeTodo, 'id' | 'done'>;

export type TypeDeleteTodoPayload = Pick<TypeTodo, 'id'>;

export type TypeTodoMode = 'add' | 'view' | 'edit';
