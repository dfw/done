import {
  TypeTodo,
  EnumTag,
  EnumSortType,
  EnumSortDirection,
  EnumShow,
} from './todos';

export type TypeState = {
  todos: TypeTodo[];
  sort: {
    type: EnumSortType;
    direction: EnumSortDirection;
  };
  filters: {
    show: EnumShow;
    tags: EnumTag[];
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
    }
  | {
      type: 'filterShow';
      payload: {
        show: EnumShow;
      };
    };

export type TypeContext = {
  state: TypeState;
  dispatch: React.Dispatch<TypeAction>;
} | null;
