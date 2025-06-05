import { IconPlus, IconSearch } from '@tabler/icons-react';
import {
  ActionIcon,
  AppShell,
  Box,
  Code,
  Group,
  ScrollArea,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { UserButton } from './UserButton/UserButton';
import classes from './SideNavBar.module.css';

const collections = [
  { emoji: '👍', label: 'Sales' },
  { emoji: '🚚', label: 'Deliveries' },
  { emoji: '💸', label: 'Discounts' },
  { emoji: '💰', label: 'Profits' },
  { emoji: '✨', label: 'Reports' },
  { emoji: '🛒', label: 'Orders' },
  { emoji: '📅', label: 'Events' },
  { emoji: '🙈', label: 'Debts' },
  { emoji: '💁‍♀️', label: 'Customers' },
];

export function SideNavBar() {
  const collectionLinks = collections.map((collection) => (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      <Box component="span" mr={9} fz={16}>
        {collection.emoji}
      </Box>{' '}
      {collection.label}
    </a>
  ));

  return (
    <AppShell.Navbar pt="md">
      <AppShell.Section px="md">
        <TextInput
          placeholder="Search"
          size="xs"
          leftSection={<IconSearch size={12} stroke={1.5} />}
          rightSectionWidth={70}
          rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
          styles={{ section: { pointerEvents: 'none' } }}
          mb="sm"
        />
      </AppShell.Section>
      <AppShell.Section grow my="md" component={ScrollArea}>
        <Group className={classes.collectionsHeader} justify="space-between">
          <Text size="xs" fw={500} c="dimmed">
            Queries
          </Text>
          <Tooltip label="Create collection" withArrow position="right">
            <ActionIcon variant="default" size={18}>
              <IconPlus size={12} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
        <div className={classes.collections}>{collectionLinks}</div>
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
