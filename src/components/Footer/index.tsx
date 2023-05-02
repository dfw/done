import styled from '@emotion/styled';
import {
  Container as MantineContainer,
  Footer as MantineFooter,
  Text,
} from '@mantine/core';

const year = new Date().getFullYear();

const Container = styled(MantineContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Footer: React.FC = () => {
  return (
    <MantineFooter height={{ base: 50, sm: 60, md: 70, lg: 80 }}>
      <Container>
        <Text>&copy; {year} David Weiss</Text>
      </Container>
    </MantineFooter>
  );
};

export default Footer;
