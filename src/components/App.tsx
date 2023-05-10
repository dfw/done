import { AppShell } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import ThemeProvider from '../providers/ThemeProvider';
import TodosProvider from '../providers/TodosProvider';
import Header from './Header';
import Footer from './Footer';
import Todos from './Todos';
import Filters from './Filters';
import Todo from './Todo';

const App: React.FC = () => {
  return (
    <TodosProvider>
      <ThemeProvider>
        <AppShell header={<Header />} footer={<Footer />}>
          <Todo initialMode="add" />
          <Filters />
          <Todos />
        </AppShell>
        <Notifications />
      </ThemeProvider>
    </TodosProvider>
  );
};

export default App;
