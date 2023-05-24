import { render } from '@testing-library/react';
import ThemeProvider from '../providers/ThemeProvider';
import TodosProvider from '../providers/TodosProvider';
import { TypeState } from '../types/providers';

export const renderWithProviders = (
  ui: React.ReactElement,
  todosProviderProps?: TypeState
) =>
  render(
    <TodosProvider initialState={todosProviderProps}>
      <ThemeProvider>{ui}</ThemeProvider>
    </TodosProvider>
  );
