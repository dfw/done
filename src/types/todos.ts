export enum EnumTag {
  Personal = 'personal',
  Work = 'work',
  Shopping = 'shopping',
  Errand = 'errand',
  Home = 'home',
  Important = 'important',
}

export enum EnumSortType {
  DateAdded = 'date-added',
  DateUpdated = 'date-updated',
}

export enum EnumSortDirection {
  Asc = 'asc',
  Desc = 'desc',
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
  dateUpdated?: string;
  dueDate: string | null;
};
