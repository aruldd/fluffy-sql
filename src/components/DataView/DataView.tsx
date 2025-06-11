import React from 'react';
import { DataGrid, type Column } from 'react-data-grid';
import { Button, Center, Group, Text, useComputedColorScheme } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { exportToCSVAndDownload } from '@/utils';

function DataView({ data }: { data?: any[] }) {
  const { ref, height } = useElementSize();
  const colorScheme = useComputedColorScheme('light');

  const columns: Column<any>[] = React.useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return Object.keys(data[0]).map((key) => ({
      key,
      name: key.charAt(0).toUpperCase() + key.slice(1),
      resizable: true,
      sortable: true,
    }));
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <Center h="100%">
        <Text size="sm">No data available. Please run the query.</Text>
      </Center>
    );
  }
  return (
    <div ref={ref} style={{ overflow: 'hidden', height: '100%' }}>
      <DataGrid
        className={colorScheme === 'dark' ? 'rdg-dark' : 'rdg-light'}
        style={{ height: `${height - 70}px` }}
        columns={columns}
        rows={data}
        defaultColumnOptions={{ resizable: true, sortable: true }}
      />
      <Group h={35} justify="space-between" px="sm" align="center">
        <Text size="xs">Total Rows: {data.length}</Text>
        <Button
          variant="subtle"
          size="xs"
          onClick={() => exportToCSVAndDownload(data, `data-export-${Date.now()}.csv`)}
        >
          Export as CSV
        </Button>
      </Group>
    </div>
  );
}

export default DataView;
