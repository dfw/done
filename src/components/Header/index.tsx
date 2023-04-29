import styled from '@emotion/styled';
import { ActionIcon, Group } from '@mantine/core';
import { IconAdjustments, IconPlus } from '@tabler/icons-react';

const H1 = styled.h1`
  margin: 0;
`;

type Props = {
  openAddModal: () => void;
};

const Header: React.FC<Props> = ({ openAddModal }) => {
  return (
    <Group position="apart">
      <H1>Done</H1>
      <ActionIcon onClick={openAddModal} color="blue" variant="filled">
        <IconPlus />
      </ActionIcon>
      <ActionIcon color="blue" variant="outline">
        <IconAdjustments />
      </ActionIcon>
    </Group>
  );
};

export default Header;
