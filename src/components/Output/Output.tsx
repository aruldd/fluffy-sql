import { IconChartArea, IconTable } from '@tabler/icons-react';
import { Tabs, Text } from '@mantine/core';
import useFluffySqlStore from '@/state/store';
import DataView from '../DataView/DataView';

export function Output() {
  const activeFluffySqlId = useFluffySqlStore((state) => state.activeFluffySqlId);
  const fluffySqls = useFluffySqlStore((state) => state.fluffySqls);
  const fluffySql = activeFluffySqlId ? fluffySqls[activeFluffySqlId] : null;

  if (!activeFluffySqlId || !fluffySql) {
    <Text size="sm" ta="center" mt="md">
      Select a query to run or create a new one.
    </Text>;
    return null;
  }

  if (!fluffySql.result) {
    return (
      <Text size="sm" ta="center" mt="md">
        Run the query to see the results.
      </Text>
    );
  }
  if (!fluffySql.result.data) {
    return (
      <Text size="sm" ta="center" mt="md">
        No data available. Please run the query.
      </Text>
    );
  }
  if (!fluffySql.result.data.length) {
    return (
      <Text size="sm" ta="center" mt="md">
        No rows returned.
      </Text>
    );
  }

  return (
    <Tabs
      defaultValue="data"
      h="100%"
      radius={0}
      styles={() => ({
        panel: {
          height: '100%',
        },
      })}
    >
      {/* Tabs.List is used to render the tab headers */}
      <Tabs.List>
        <Tabs.Tab value="data" leftSection={<IconTable size={12} />}>
          Data
        </Tabs.Tab>
        <Tabs.Tab value="chart" leftSection={<IconChartArea size={12} />}>
          Chart
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="data">
        <DataView data={fluffySql.result.data} />
      </Tabs.Panel>

      <Tabs.Panel value="chart">Chart tab content</Tabs.Panel>
    </Tabs>
  );
}
