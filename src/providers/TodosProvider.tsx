import { createContext, useContext, useReducer } from 'react';
import { TodosContextType, TodosProviderProps } from './types';
import { todosReducer, initialTodosReducerState } from './util';

const TodosContext = createContext<TodosContextType>(null);

const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, initialTodosReducerState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    throw new Error('useTodoContext must be used within TodoProvider');
  }

  return todosContext;
};

export default TodosProvider;
