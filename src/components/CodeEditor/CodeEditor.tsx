import React, { useEffect, useMemo, useRef, useState } from 'react';
import { sql } from '@codemirror/lang-sql';
import {
  IconCircleCheckFilled,
  IconExclamationCircleFilled,
  IconPlayerPlay,
} from '@tabler/icons-react';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import debounce from 'lodash/debounce';
import { Button, Group, Text, useComputedColorScheme } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import useFluffySqlStore from '@/state/store';
import { getRelativeTimeFromNow } from '@/utils';
import classes from './CodeEditor.module.css';

function CodeEditor() {
  const { ref, height } = useElementSize();
  const editorRef = useRef<ReactCodeMirrorRef | null>(null);
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
    }, 3000);
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
    // if editor ref, find class 'cm-content' and add aria-label to it
    if (editorRef.current) {
      // Find the element with the class 'cm-content' within the ref's current value.
      const contentElement = editorRef.current.editor?.querySelector('.cm-content');

      // If the element is found, add the aria-label attribute.
      if (contentElement) {
        contentElement.setAttribute('aria-label', 'Code Editor');
      }
    }
  }, [editorRef]);

  useEffect(() => {
    if (value !== fluffySql?.sql) {
      debouncedSave(value);
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
        <Text size="sm" ta="center" mt="md">
          Select a query to edit or create a new one.
        </Text>
      </div>
    );
  }
  return (
    <div ref={ref} className={classes.codeEditorContainer}>
      <CodeMirror
        theme={colorScheme}
        value={value}
        height={`${height - 40}px`}
        extensions={[sql()]}
        onChange={onChange}
        ref={editorRef}
      />

      <Group
        justify="space-between"
        className={classes.codeEditorFooter}
        px="sm"
        align="center"
        h="40px"
      >
        {fluffySql.updatedAt ? (
          <Text size="xs">
            {isSaving ? 'Saving...' : `Saved ${getRelativeTimeFromNow(fluffySql.updatedAt)}`}
          </Text>
        ) : null}
        <Group gap="xs">
          {fluffySql.result?.error && (
            <Group gap="xs" align="center">
              <IconExclamationCircleFilled color="orange" size={16} />
              <Text size="xs">{fluffySql.result.error}</Text>
            </Group>
          )}
          {fluffySql.result?.status === 'success' && (
            <Group gap="xs" align="center">
              <IconCircleCheckFilled color="green" size={16} />
              <Text size="xs">Success</Text>
            </Group>
          )}
          <Button
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
