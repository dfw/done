import {
  TypeTodo,
  EnumTag,
  EnumSortType,
  EnumSortDirection,
  EnumDisplayType,
} from './todos';

export type TypeState = {
  todos: TypeTodo[];
  sort: {
    type: EnumSortType;
    direction: EnumSortDirection;
  };
  filters: {
    displayType: EnumDisplayType;
    tags: EnumTag[];
  };
  showFilters: boolean;
};

export type TypeAction =
  | {
      type: 'addTodo';
      payload: {
        name: string;
        tags: EnumTag[];
        dueDate: string | null;
      };
    }
  | {
      type: 'checkTodo';
      payload: {
        id: string;
        done: boolean;
      };
    }
  | {
      type: 'toggleFilters';
    }
  | {
      type: 'changeSortType';
      payload: {
        type: EnumSortType;
      };
    }
  | {
      type: 'changeSortDirection';
      payload: {
        direction: EnumSortDirection;
      };
    }
  | {
      type: 'filterDisplay';
      payload: {
        displayType: EnumDisplayType;
      };
    }
  | {
      type: 'filterTags';
      payload: {
        tags: EnumTag[];
      };
    }
  | {
      type: 'deleteAllTodos';
    };

export type TypeContext = {
  state: TypeState;
  dispatch: React.Dispatch<TypeAction>;
} | null;
