import { ColorScheme, MantineSize } from '@mantine/core';
import {
  TypeTodo,
  EnumTag,
  EnumSortType,
  EnumSortDirection,
  EnumDisplayType,
  TypeAddTodoPayload,
  TypeUpdateTodoPayload,
  TypeCheckTodoPayload,
  TypeDeleteTodoPayload,
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
  colorScheme: ColorScheme;
};

export type TypeAction =
  | {
      type: 'addTodo';
      payload: TypeAddTodoPayload;
    }
  | {
      type: 'updateTodo';
      payload: TypeUpdateTodoPayload;
    }
  | {
      type: 'deleteTodo';
      payload: TypeDeleteTodoPayload;
    }
  | {
      type: 'checkTodo';
      payload: TypeCheckTodoPayload;
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
      type: 'changeColorScheme';
      payload: {
        colorScheme: ColorScheme;
      };
    }
  | {
      type: 'deleteAllTodos';
    }
  | {
      type: 'resetApp';
    };

export type TypeContext = {
  state: TypeState;
  dispatch: React.Dispatch<TypeAction>;
  mq: Partial<Record<MantineSize, boolean>>;
} | null;
