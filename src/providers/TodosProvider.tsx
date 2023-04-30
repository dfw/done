import { createContext, useContext, useReducer } from 'react';
import { TypeContext } from '../types/providers';
import { reducer, initialState } from '../utils/providers';

type Props = {
  children: React.ReactNode;
};

const TodosContext = createContext<TypeContext>(null);

const TodosProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
