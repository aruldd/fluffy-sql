import React from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Group, Text, Tooltip } from '@mantine/core';
import useFluffySqlStore from '@/state/store';
import classes from './FluffySqlsList.module.css';

function FluffySqlsList({ onEdit = () => {} }: { onEdit?: (id: string) => void }) {
  const fluffySqls = useFluffySqlStore((state) => state.fluffySqls);
  const openFluffySql = useFluffySqlStore((state) => state.openFluffySql);
  const deleteFluffySql = useFluffySqlStore((state) => state.deleteFluffySql);
  const fluffySqlLinks = Object.values(fluffySqls).map((fluffySql) => (
    <a
      href="#"
      onClick={(event) => {
        event.preventDefault();
        // Open the Fluffy SQL editor for the selected SQL
        openFluffySql(fluffySql.id);
      }}
      key={fluffySql.id}
      className={classes.fluffySqlLink}
    >
      <Group justify="space-between" className={classes.fluffySqlLinkContent}>
        <Text size="sm" fw={500}>
          {fluffySql.title}
        </Text>
        <Group gap="xs" className={classes.fluffySqlLinkActions}>
          <Tooltip label="Edit fluffySql" withArrow position="right">
            <ActionIcon variant="default" size={18} onClick={() => onEdit(fluffySql.id)}>
              <IconEdit size={12} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete fluffySql" withArrow position="right">
            <ActionIcon variant="default" size={18} onClick={() => deleteFluffySql(fluffySql.id)}>
              <IconTrash size={12} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </a>
  ));
  return <div className={classes.fluffySqls}>{fluffySqlLinks}</div>;
}

export default FluffySqlsList;
