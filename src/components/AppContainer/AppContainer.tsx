// import { UserButton } from '../UserButton/UserButton';
import { Allotment } from 'allotment';
import { AppShell } from '@mantine/core';
import { SideNavBar } from '../SideNavBar/SideNavBar';
import classes from './AppContainer.module.css';

import 'allotment/dist/style.css';

import { useDisclosure } from '@mantine/hooks';
import CodeEditor from '../CodeEditor/CodeEditor';
import { Output } from '../Output/Output';
import { QueryTabs } from '../QueryTabs/QueryTabs';

export function AppContainer() {
  const [opened] = useDisclosure();

  return (
    <AppShell
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      header={{ height: 60 }}
      layout="alt"
    >
      <AppShell.Header>
        <QueryTabs />
      </AppShell.Header>
      <SideNavBar />
      <AppShell.Main>
        <div className={classes.contentArea}>
          <Allotment vertical>
            <Allotment.Pane minSize={300} preferredSize={700}>
              <CodeEditor />
            </Allotment.Pane>
            <Allotment.Pane minSize={300} preferredSize={300}>
              <Output />
            </Allotment.Pane>
          </Allotment>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
