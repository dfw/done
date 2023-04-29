type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export type TodosState = {
  todos: Todo[];
};

export type TodosAction =
  | {
      type: 'add';
      payload: {
        text: string;
      };
    }
  | {
      type: 'check';
      payload: {
        id: string;
        done: boolean;
      };
    };

export type TodosContextType = {
  state: TodosState;
  dispatch: React.Dispatch<TodosAction>;
} | null;

export type TodosProviderProps = {
  children: React.ReactNode;
};
