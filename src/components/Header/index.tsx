import {
  ActionIcon,
  Group,
  Menu,
  Switch,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconAdjustmentsHorizontal,
  IconMenu2,
  IconMoonFilled,
  IconPlus,
} from '@tabler/icons-react';
import { useTodosContext } from '../../providers/TodosProvider';

type Props = {
  openAddModal: () => void;
  filtersOpened: boolean;
  toggleFilters: () => void;
};

const Header: React.FC<Props> = ({
  openAddModal,
  filtersOpened,
  toggleFilters,
}) => {
  const {
    state: { todos },
  } = useTodosContext();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const allDone = !!todos.length && todos.every((todo) => todo.done);

  return (
    <Group position="center" my={15}>
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
            onClick={toggleFilters}
          >
            {filtersOpened ? 'Hide' : 'Show'} filters
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
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default Header;
