import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { AppContainer } from './components/AppContainer/AppContainer';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AppContainer />
    </MantineProvider>
  );
}
