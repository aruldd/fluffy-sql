import { IconX } from '@tabler/icons-react';
import { Button, Group, Indicator } from '@mantine/core';
import classes from './QueryTabs.module.css';

function QueryTab({
  label,
  isActive = false,
}: {
  label: string;
  isActive?: boolean;
  value: string;
  onClose: () => void;
}) {
  return (
    <div className={classes.queryTab}>
      <Indicator size={6}>
        <Button.Group>
          <Button color={isActive ? 'blue' : 'gray'} variant="transparent" size="compact-md">
            {label}
          </Button>
          <Button color={isActive ? 'blue' : 'gray'} size="compact-md" variant="transparent">
            <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </Button>
        </Button.Group>
      </Indicator>
    </div>
  );
}
export function QueryTabs() {
  return (
    <Group className={classes.queryTabs} pl="sm" align="flex-end">
      <QueryTab value="1" label="Tab 1" onClose={() => {}} isActive />
      <QueryTab value="2" label="Tab 2" onClose={() => {}} />
      <QueryTab value="3" label="Tab 3" onClose={() => {}} />
    </Group>
  );
}
