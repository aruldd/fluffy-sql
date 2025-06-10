import React, { useEffect, useMemo, useState } from 'react';
import Editor from '@monaco-editor/react';
import {
  IconCircleCheckFilled,
  IconExclamationCircleFilled,
  IconPlayerPlay,
} from '@tabler/icons-react';
import debounce from 'lodash/debounce';
import { Button, Group, Text, useComputedColorScheme } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import useFluffySqlStore from '@/state/store';
import { getRelativeTimeFromNow } from '@/utils';
import classes from './CodeEditor.module.css';

function CodeEditor() {
  const { ref, height } = useElementSize();
  const colorScheme = useComputedColorScheme('light');

  const activeFluffySqlId = useFluffySqlStore((state) => state.activeFluffySqlId);
  const [currentFluffySqlId, setCurrentFluffySqlId] = useState<string | undefined>(undefined);
  const fluffySqls = useFluffySqlStore((state) => state.fluffySqls);
  const fluffySql = useMemo(() => {
    return activeFluffySqlId ? fluffySqls[activeFluffySqlId] : null;
  }, [activeFluffySqlId, fluffySqls]);

  const updateFluffySql = useFluffySqlStore((state) => state.updateFluffySql);
  const runFluffySql = useFluffySqlStore((state) => state.runFluffySql);

  const [value, setValue] = useState(fluffySql?.sql || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const debouncedSave = useMemo(() => {
    return debounce((sql: string) => {
      if (activeFluffySqlId) {
        setIsSaving(true);
        setTimeout(() => {
          // Simulate a save operation
          setIsSaving(false);
          updateFluffySql(activeFluffySqlId, undefined, undefined, sql);
        }, 1000);
      }
    }, 1000);
  }, [activeFluffySqlId, updateFluffySql]);

  const runQuery = () => {
    if (activeFluffySqlId) {
      setIsRunning(true);
      setTimeout(() => {
        // Simulate a run operation
        runFluffySql(activeFluffySqlId, value);
        setIsRunning(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (value !== fluffySql?.sql) {
      debouncedSave(value);
      console.log('🚀 ~ useEffect ~ debouncedSave(value);:');
    }
  }, [value, fluffySql, debouncedSave]);

  useEffect(() => {
    if (activeFluffySqlId !== currentFluffySqlId) {
      setCurrentFluffySqlId(activeFluffySqlId);
      setValue(fluffySql?.sql || '');
      setIsSaving(false);
      setIsRunning(false);
    }
  }, [activeFluffySqlId, currentFluffySqlId]);

  const onChange = React.useCallback((val?: string) => {
    setValue(val || '');
  }, []);

  if (!activeFluffySqlId || !fluffySql) {
    return (
      <div ref={ref} className={classes.codeEditorContainer}>
        <Text size="sm" c="dimmed" ta="center" mt="md">
          Select a query to edit or create a new one.
        </Text>
      </div>
    );
  }
  return (
    <div ref={ref} className={classes.codeEditorContainer}>
      <Editor
        height={`${height - 40}px`}
        defaultLanguage="sql"
        defaultValue={value}
        theme={colorScheme === 'dark' ? 'vs-dark' : 'light'}
        onChange={onChange}
        value={value}
        path={activeFluffySqlId}
      />
      <Group
        justify="space-between"
        className={classes.codeEditorFooter}
        px="sm"
        align="center"
        h="40px"
      >
        {fluffySql.updatedAt ? (
          <Text size="xs" c="dimmed">
            {isSaving ? 'Saving...' : `Saved ${getRelativeTimeFromNow(fluffySql.updatedAt)}`}
          </Text>
        ) : null}
        <Group gap="xs">
          {fluffySql.result?.error && (
            <Group gap="xs" align="center">
              <IconExclamationCircleFilled color="orange" size={16} />
              <Text size="xs" c="dimmed">
                {fluffySql.result.error}
              </Text>
            </Group>
          )}
          {fluffySql.result?.status === 'success' && (
            <Group gap="xs" align="center">
              <IconCircleCheckFilled color="green" size={16} />
              <Text size="xs" c="dimmed">
                Success
              </Text>
            </Group>
          )}
          <Button
            color="blue"
            size="xs"
            rightSection={<IconPlayerPlay size={16} />}
            onClick={runQuery}
            loading={isRunning}
          >
            Run Query
          </Button>
        </Group>
      </Group>
    </div>
  );
}
export default CodeEditor;
