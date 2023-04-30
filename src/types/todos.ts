export enum EnumTag {
  Personal = 'Personal',
  Work = 'Work',
  Shopping = 'Shopping',
  Errand = 'Errand',
  Home = 'Home',
  Important = 'Important',
}

export type TypeTodo = {
  id: string;
  name: string;
  done: boolean;
  tags: EnumTag[];
};
