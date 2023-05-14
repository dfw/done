import { render } from '@testing-library/react';
import TodosProvider from '../providers/TodosProvider';
import ThemeProvider from '../providers/ThemeProvider';

export const renderWithProviders = (component: React.ReactNode) =>
  render(
    <TodosProvider>
      <ThemeProvider>{component}</ThemeProvider>
    </TodosProvider>
  );
