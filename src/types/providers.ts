import { TypeTodo, EnumTag, EnumSortType, EnumSortDirection } from './todos';

export type TypeState = {
  todos: TypeTodo[];
  sort: {
    type: EnumSortType;
    direction: EnumSortDirection;
  };
};

export type TypeAction =
  | {
      type: 'add';
      payload: {
        name: string;
        tags: EnumTag[];
      };
    }
  | {
      type: 'check';
      payload: {
        id: string;
        done: boolean;
      };
    }
  | {
      type: 'sortType';
      payload: {
        type: EnumSortType;
      };
    }
  | {
      type: 'sortDirection';
      payload: {
        direction: EnumSortDirection;
      };
    };

export type TypeContext = {
  state: TypeState;
  dispatch: React.Dispatch<TypeAction>;
} | null;
