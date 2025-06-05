import { IconChartArea, IconTable } from '@tabler/icons-react';
import { Tabs } from '@mantine/core';
import DataView from '../DataView/DataView';

export function Output() {
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
        <DataView />
      </Tabs.Panel>

      <Tabs.Panel value="chart">Chart tab content</Tabs.Panel>
    </Tabs>
  );
}
