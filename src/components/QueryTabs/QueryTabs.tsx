import { IconX } from '@tabler/icons-react';
import { Button, Group } from '@mantine/core';
import useFluffySqlStore from '@/state/store';
import classes from './QueryTabs.module.css';

function QueryTab({
  label,
  isActive = false,
  id,
  onClickTitle,
  onClose,
}: {
  label: string;
  isActive?: boolean;
  id: string;
  onClickTitle: () => void;
  onClose: () => void;
}) {
  return (
    <div className={classes.queryTab} key={id}>
      <Button.Group>
        <Button
          color={isActive ? 'blue' : 'gray'}
          variant="transparent"
          size="compact-md"
          fullWidth
          onClick={onClickTitle}
        >
          {label}
        </Button>
        <Button
          color={isActive ? 'blue' : 'gray'}
          size="compact-md"
          variant="transparent"
          onClick={onClose}
        >
          <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </Button>
      </Button.Group>
    </div>
  );
}
export function QueryTabs() {
  const openedFluffySqlIds = useFluffySqlStore((state) => state.openedFluffySqlIds);
  const fluffySqlLite = useFluffySqlStore((state) => state.fluffySqls);
  const activeFluffySqlId = useFluffySqlStore((state) => state.activeFluffySqlId);
  const closeFluffySql = useFluffySqlStore((state) => state.closeFluffySql);
  const activateFluffySql = useFluffySqlStore((state) => state.activateFluffySql);

  return (
    <Group className={classes.queryTabs} pl="sm" align="flex-end">
      {openedFluffySqlIds.map((id) => {
        const fluffySql = fluffySqlLite[id];
        if (!fluffySql) {
          return null;
        }

        return (
          <QueryTab
            key={id}
            label={fluffySql.title}
            isActive={activeFluffySqlId === id}
            id={id}
            onClickTitle={() => activateFluffySql(id)}
            onClose={() => closeFluffySql(id)}
          />
        );
      })}
    </Group>
  );
}
