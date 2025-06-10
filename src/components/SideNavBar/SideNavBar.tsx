/// <reference types="vite-plugin-svgr/client" />
import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { ActionIcon, AppShell, Group, ScrollArea, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ReactLogo from '../../assets/fluffy-sql-logo.svg?react';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import UpdateFluffySql from '../modals/UpdateFluffySql/UpdateFluffySql';
import FluffySqlsList from './FluffySqlsList/FluffySqlsList';
import { UserButton } from './UserButton/UserButton';
import classes from './SideNavBar.module.css';

export function SideNavBar() {
  const [opened, { open, close }] = useDisclosure(false);
  const [updateFluffySqlId, setUpdateFluffySqlId] = useState<string | undefined>(undefined);
  const handleEdit = (id: string) => {
    setUpdateFluffySqlId(id);
    open();
  };
  const handleCreate = () => {
    setUpdateFluffySqlId(undefined);
    open();
  };

  return (
    <AppShell.Navbar pt="md">
      <AppShell.Section>
        <Group justify="center" h="60px">
          <ReactLogo className={classes.logo} />
        </Group>
      </AppShell.Section>
      {opened && <UpdateFluffySql opened={opened} close={close} id={updateFluffySqlId} />}
      <AppShell.Section grow component={ScrollArea}>
        <Group className={classes.fluffySqlsHeader} justify="space-between" p="md">
          <Text size="md" fw={500} c="dimmed">
            Queries
          </Text>
          <Tooltip label="Create fluffySql" withArrow position="right">
            <ActionIcon variant="default" size={18} onClick={handleCreate}>
              <IconPlus size={12} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
        <FluffySqlsList onEdit={handleEdit} />
      </AppShell.Section>

      <AppShell.Section>
        <Group wrap="nowrap" gap="xs" p="sm">
          <ColorSchemeToggle />
          <UserButton />
        </Group>
      </AppShell.Section>
    </AppShell.Navbar>
  );
}
