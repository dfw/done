import { MantineProvider } from '@mantine/core';

const App: React.FC = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div>Done</div>
    </MantineProvider>
  );
};

export default App;
