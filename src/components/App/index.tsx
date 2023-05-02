import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import ThemeProvider from '../../providers/ThemeProvider';
import TodosProvider from '../../providers/TodosProvider';
import Header from '../Header';
import Footer from '../Footer';
import AddModal from '../AddModal';
import Todos from '../Todos';
import Filters from '../Filters';

const App: React.FC = () => {
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);

  return (
    <ThemeProvider>
      <TodosProvider>
        <AppShell
          header={<Header openAddModal={openAddModal} />}
          footer={<Footer />}
        >
          <Filters />
          <Todos />
          <AddModal opened={addModalOpened} closeModal={closeAddModal} />
        </AppShell>
      </TodosProvider>
      <Notifications />
    </ThemeProvider>
  );
};

export default App;
