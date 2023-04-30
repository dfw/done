import { TypeTodo, EnumTag } from './todos';

export type TypeState = {
  todos: TypeTodo[];
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
    };

export type TypeContext = {
  state: TypeState;
  dispatch: React.Dispatch<TypeAction>;
} | null;
