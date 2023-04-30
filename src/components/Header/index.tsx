import styled from '@emotion/styled';
import { ActionIcon, Group, Title } from '@mantine/core';
import { IconMoonStars, IconPlus, IconSun } from '@tabler/icons-react';

const H1 = styled.h1`
  margin: 0;
`;

type Props = {
  openAddModal: () => void;
};

const Header: React.FC<Props> = ({ openAddModal }) => {
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
      {/* <ActionIcon color="blue">
        <IconMoonStars />
      </ActionIcon> */}
      <ActionIcon color="blue">
        <IconSun />
      </ActionIcon>
    </Group>
  );
};

export default Header;
