import { Collapse, Container, MantineProvider, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import TodoProvider from '../../providers/TodosProvider';
import Header from '../Header';
import AddModal from '../AddModal';
import TodosList from '../TodosList';

const App: React.FC = () => {
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <TodoProvider>
        <Container size="600px">
          <Header openAddModal={openAddModal} />
          <Collapse in={false}>
            <Text>Settings go here!!</Text>
          </Collapse>
          <TodosList />
          <AddModal opened={addModalOpened} close={closeAddModal} />
        </Container>
      </TodoProvider>
      <Notifications />
    </MantineProvider>
  );
};

export default App;
