import React from 'react';
import Editor from '@monaco-editor/react';
import { IconPlayerPlay } from '@tabler/icons-react';
import { Button, Group, Text, useComputedColorScheme } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import classes from './CodeEditor.module.css';

function CodeEditor() {
  const { ref, height } = useElementSize();
  const [value, setValue] = React.useState(`SELECT * FROM users WHERE age > 30;
    UPDATE users SET last_login = NOW() WHERE id = 1;
    INSERT INTO users (name, age) VALUES ('John Doe', 25);
    DELETE FROM users WHERE id = 2;
    SELECT * FROM users WHERE age > 30;
    UPDATE users SET last_login = NOW() WHERE id = 1;
    INSERT INTO users (name, age) VALUES ('John Doe', 25);
    DELETE FROM users WHERE id = 2;
    SELECT * FROM users WHERE age > 30;
    UPDATE users SET last_login = NOW() WHERE id = 1;
    INSERT INTO users (name, age) VALUES ('John Doe', 25);
    DELETE FROM users WHERE id = 2;
    SELECT * FROM users WHERE age > 30;
    UPDATE users SET last_login = NOW() WHERE id = 1;
    INSERT INTO users (name, age) VALUES ('John Doe', 25);
    DELETE FROM users WHERE id = 2;
    UPDATE users SET last_login = NOW() WHERE id = 1;
    INSERT INTO users (name, age) VALUES ('John Doe', 25);
    DELETE FROM users WHERE id = 2;
    SELECT * FROM users WHERE age > 30;
    UPDATE users SET last_login = NOW() WHERE id = 1;
    INSERT INTO users (name, age) VALUES ('John Doe', 25);
    DELETE FROM users WHERE id = 2;
    SELECT * FROM users WHERE age > 30;
    UPDATE users SET last_login = NOW() WHERE id = 1;
    INSERT INTO users (name, age) VALUES ('John Doe', 25);
    DELETE FROM users WHERE id = 2;
    SELECT * FROM users WHERE age > 30;
    UPDATE users SET last_login = NOW() WHERE id = 1;
    INSERT INTO users (name, age) VALUES ('John Doe', 25);
    DELETE FROM users WHERE id = 2;
    
    
    `);
  const colorScheme = useComputedColorScheme('light');
  const onChange = React.useCallback((val?: string) => {
    setValue(val || '');
  }, []);
  return (
    <div ref={ref} className={classes.codeEditorContainer}>
      <Editor
        height={`${height - 40}px`}
        defaultLanguage="sql"
        defaultValue={value}
        theme={colorScheme}
        onChange={onChange}
      />
      <Group
        justify="space-between"
        className={classes.codeEditorFooter}
        px="sm"
        align="center"
        h="40px"
      >
        <Text size="xs" c="dimmed">
          Saving...
        </Text>
        <Button color="blue" size="xs" rightSection={<IconPlayerPlay size={16} />}>
          Run Query
        </Button>
      </Group>
    </div>
  );
}
export default CodeEditor;
