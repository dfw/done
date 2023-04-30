import { ActionIcon, Group, Menu, Switch, Title } from '@mantine/core';
import {
  IconAdjustmentsHorizontal,
  IconMenu2,
  IconMoonStars,
  IconPlus,
  IconSun,
} from '@tabler/icons-react';

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
  return (
    <Group position="center" my={15}>
      <Title order={1}>Done</Title>
      <ActionIcon
        onClick={openAddModal}
        color="blue"
        variant="filled"
        sx={{ margin: '0 auto' }}
      >
        <IconPlus />
      </ActionIcon>
      <Menu position="bottom-end" shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon>
            <IconMenu2 />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Settings</Menu.Label>
          <Menu.Item
            icon={<IconAdjustmentsHorizontal size={14} />}
            onClick={toggleFilters}
          >
            {filtersOpened ? 'Hide' : 'Show'} filters
          </Menu.Item>
          <Menu.Label>
            <Group position="apart">
              Theme
              <Switch
                size="md"
                onLabel={<IconMoonStars size={16} />}
                offLabel={<IconSun size={16} />}
              />
            </Group>
          </Menu.Label>
          <Menu.Divider />
          <Menu.Label>Danger Zone</Menu.Label>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default Header;
