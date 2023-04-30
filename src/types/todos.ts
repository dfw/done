export enum EnumTag {
  Personal = 'Personal',
  Work = 'Work',
  Shopping = 'Shopping',
  Errand = 'Errand',
  Home = 'Home',
  Important = 'Important',
}

export enum EnumSortType {
  DateAdded = 'Date added',
  DateUpdated = 'Date updated',
}

export enum EnumSortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum EnumShow {
  All = 'All',
  NotDone = 'Not done',
  Done = 'Done',
}

export type TypeTodo = {
  id: string;
  name: string;
  done: boolean;
  tags: EnumTag[];
  dateAdded: string;
  dateUpdated?: string;
};
