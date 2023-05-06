import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useTodosContext } from './TodosProvider';

type Props = {
  children: React.ReactNode;
};

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const {
    state: { colorScheme },
    dispatch,
  } = useTodosContext();

  const toggleColorScheme = (value?: ColorScheme) =>
    dispatch({
      type: 'changeColorScheme',
      payload: {
        colorScheme: value || (colorScheme === 'dark' ? 'light' : 'dark'),
      },
    });

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
        }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default ThemeProvider;
