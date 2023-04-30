import { Button, Group, Tabs, Text } from '@mantine/core';
import {
  IconFilter,
  IconArrowsSort,
  IconSearch,
  IconSortAscending,
  IconSortDescending,
} from '@tabler/icons-react';
import { useTodosContext } from '../../providers/TodosProvider';
import { EnumSortDirection, EnumSortType } from '../../types/todos';

type Props = {
  opened: boolean;
};

const Filters: React.FC<Props> = ({ opened }) => {
  const {
    state: { sort },
    dispatch,
  } = useTodosContext();

  const handleSortTypeClick = (type: EnumSortType) => {
    dispatch({
      type: 'sortType',
      payload: {
        type,
      },
    });
  };

  const handleSortDirectionClick = (direction: EnumSortDirection) => {
    dispatch({
      type: 'sortDirection',
      payload: {
        direction,
      },
    });
  };

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
      <Tabs.Panel value="filter" pt={15}>
        This is the filter.
      </Tabs.Panel>
      <Tabs.Panel value="sort" pt={15}>
        <Group>
          <Text fw={700}>Sort by:</Text>
          <Button.Group>
            {Object.values(EnumSortType).map((sortType) => (
              <Button
                variant={sort.type === sortType ? 'filled' : 'light'}
                onClick={() => handleSortTypeClick(sortType)}
                key={sortType}
              >
                {sortType}
              </Button>
            ))}
          </Button.Group>
          <Button.Group>
            <Button
              variant={
                sort.direction === EnumSortDirection.Asc ? 'filled' : 'light'
              }
              onClick={() => handleSortDirectionClick(EnumSortDirection.Asc)}
            >
              <IconSortAscending />
            </Button>
            <Button
              variant={
                sort.direction === EnumSortDirection.Desc ? 'filled' : 'light'
              }
              onClick={() => handleSortDirectionClick(EnumSortDirection.Desc)}
            >
              <IconSortDescending />
            </Button>
          </Button.Group>
        </Group>
      </Tabs.Panel>
      <Tabs.Panel value="search" pt={15}>
        This is the search.
      </Tabs.Panel>
    </Tabs>
  ) : null;
};

export default Filters;
