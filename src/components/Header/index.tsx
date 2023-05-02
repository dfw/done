import styled from '@emotion/styled';
import {
  ActionIcon,
  Container as MantineContainer,
  Group,
  Header as MantineHeader,
  Menu,
  Switch,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconAdjustmentsHorizontal,
  IconMenu2,
  IconMoonFilled,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import { useTodosContext } from '../../providers/TodosProvider';
import ConfirmModal from '../ConfirmModal';

type Props = {
  openAddModal: () => void;
};

const Container = styled(MantineContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const Header: React.FC<Props> = ({ openAddModal }) => {
  const {
    state: { todos, showFilters },
    dispatch,
  } = useTodosContext();
  const [
    confirmDeleteModalOpened,
    { open: openConfirmDeleteModal, close: closeConfirmDeleteModal },
  ] = useDisclosure(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const canDeleteTodos = !!todos.length;
  const allDone = !!todos.length && todos.every((todo) => todo.done);

  const handleFiltersClick = () => {
    dispatch({
      type: 'toggleFilters',
    });
  };

  const handleDeleteClick = () => {
    openConfirmDeleteModal();
  };

  return (
    <>
      <MantineHeader height={{ base: 50, sm: 60, md: 70, lg: 80 }}>
        <Container>
          <Title
            order={1}
            sx={{ textDecoration: allDone ? 'line-through' : 'none' }}
          >
            Done
          </Title>
          <ActionIcon
            onClick={openAddModal}
            color="blue"
            variant="filled"
            sx={{ margin: '0 auto' }}
          >
            <IconPlus />
          </ActionIcon>
          <Menu position="bottom-end" shadow="md" width={200} keepMounted>
            <Menu.Target>
              <ActionIcon>
                <IconMenu2 />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                icon={<IconAdjustmentsHorizontal size={16} />}
                onClick={handleFiltersClick}
              >
                {showFilters ? 'Hide' : 'Show'} filters
              </Menu.Item>
              <Menu.Item
                icon={<IconMoonFilled size={16} />}
                closeMenuOnClick={false}
                sx={{
                  cursor: 'default',
                }}
              >
                <Group position="apart">
                  Dark Mode
                  <Switch
                    size="md"
                    checked={colorScheme === 'dark'}
                    onChange={() => toggleColorScheme()}
                  />
                </Group>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Label>Danger Zone</Menu.Label>
              <Menu.Item
                color="red"
                icon={<IconTrash size={16} />}
                onClick={handleDeleteClick}
                disabled={!canDeleteTodos}
              >
                Delete all todos
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Container>
      </MantineHeader>
      <ConfirmModal
        opened={confirmDeleteModalOpened}
        closeModal={closeConfirmDeleteModal}
        title="Delete all todos"
      />
    </>
  );
};

export default Header;
