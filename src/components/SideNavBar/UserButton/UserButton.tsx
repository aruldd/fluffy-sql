import { IconChevronRight } from '@tabler/icons-react';
import { Group, Text, UnstyledButton } from '@mantine/core';
import classes from './UserButton.module.css';

export function UserButton() {
  return (
    <UnstyledButton className={classes.user}>
      <Group wrap="nowrap">
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            John Kumar
          </Text>

          <Text size="xs">johnKumar@outlook.com</Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
