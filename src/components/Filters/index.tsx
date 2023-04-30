import { Tabs } from '@mantine/core';
import { IconFilter, IconArrowsSort, IconSearch } from '@tabler/icons-react';

type Props = {
  opened: boolean;
};

const Filters: React.FC<Props> = ({ opened }) => {
  return opened ? (
    <Tabs defaultValue="filter">
      <Tabs.List grow>
        <Tabs.Tab value="filter" icon={<IconFilter size="0.8rem" />}>
          Filter
        </Tabs.Tab>
        <Tabs.Tab value="sort" icon={<IconArrowsSort size="0.8rem" />}>
          Sort
        </Tabs.Tab>
        <Tabs.Tab value="search" icon={<IconSearch size="0.8rem" />}>
          Search
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="filter">This is the filter.</Tabs.Panel>
      <Tabs.Panel value="sort">This is the sort.</Tabs.Panel>
      <Tabs.Panel value="search">This is the search.</Tabs.Panel>
    </Tabs>
  ) : null;
};

export default Filters;
