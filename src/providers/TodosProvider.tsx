import { createContext, useContext, useEffect, useReducer } from 'react';
import { TypeContext, TypeState } from '../types/providers';
import { reducer, initialState } from '../utils/providers';

type Props = {
  children: React.ReactNode;
};

const init = (initialState: TypeState) => {
  const stateFromStorage = localStorage.getItem('app-state');

  if (stateFromStorage) {
    return JSON.parse(stateFromStorage) as TypeState;
  }

  return initialState;
};

const TodosContext = createContext<TypeContext>(null);

const TodosProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    localStorage.setItem('app-state', JSON.stringify(state));
  }, [state]);

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
