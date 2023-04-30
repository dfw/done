import { Container, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import TodoProvider from '../../providers/TodosProvider';
import Header from '../Header';
import AddModal from '../AddModal';
import Todos from '../Todos';
import Filters from '../Filters';

const App: React.FC = () => {
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);
  const [filtersOpened, { toggle: toggleFilters }] = useDisclosure(false);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
      }}
    >
      <TodoProvider>
        <Container size="600px">
          <Header
            openAddModal={openAddModal}
            filtersOpened={filtersOpened}
            toggleFilters={toggleFilters}
          />
          <Filters opened={filtersOpened} />
          <Todos />
          <AddModal opened={addModalOpened} closeModal={closeAddModal} />
        </Container>
      </TodoProvider>
      <Notifications />
    </MantineProvider>
  );
};

export default App;
