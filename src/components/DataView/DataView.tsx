import React from 'react';
import { DataGrid, type Column } from 'react-data-grid';
import { Center, Text, useComputedColorScheme } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import sampleData from './sampleData.json';

function DataView({ data = sampleData }: { data?: any[] }) {
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

  return (
    <div ref={ref} style={{ overflow: 'hidden', height: '100%' }}>
      <DataGrid
        className={colorScheme === 'dark' ? 'rdg-dark' : 'rdg-light'}
        style={{ height: `${height - 70}px` }}
        columns={columns}
        rows={data}
        defaultColumnOptions={{ resizable: true, sortable: true }}
      />
      <Center h={35}>
        <Text size="sm">Total Rows: {data.length}</Text>
      </Center>
    </div>
  );
}

export default DataView;
