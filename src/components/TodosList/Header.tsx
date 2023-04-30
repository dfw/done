import { ActionIcon, Group } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

const Header: React.FC = () => {
  return (
    <Group position="center">
      <ActionIcon color="blue">
        <IconAdjustments />
      </ActionIcon>
    </Group>
  );
};

export default Header;
