import { Button, Container, Group, Tabs, Text } from '@mantine/core';
import {
  IconFilter,
  IconArrowsSort,
  IconSearch,
  IconSortAscending,
  IconSortDescending,
} from '@tabler/icons-react';
import { useTodosContext } from '../../providers/TodosProvider';
import {
  EnumDisplayType,
  EnumSortDirection,
  EnumSortType,
} from '../../types/todos';
import { DisplayTypes } from '../../utils/todos';

type Props = {
  opened: boolean;
};

const Filters: React.FC<Props> = ({ opened }) => {
  const {
    state: {
      sort,
      filters: { displayType },
    },
    dispatch,
  } = useTodosContext();

  const handleSortTypeClick = (type: EnumSortType) => {
    dispatch({
      type: 'changeSortType',
      payload: {
        type,
      },
    });
  };

  const handleSortDirectionClick = (direction: EnumSortDirection) => {
    dispatch({
      type: 'changeSortDirection',
      payload: {
        direction,
      },
    });
  };

  const handleDisplayFilter = (displayType: EnumDisplayType) => {
    dispatch({
      type: 'filterDisplay',
      payload: {
        displayType,
      },
    });
  };

  return opened ? (
    <Container>
      <Tabs defaultValue="filters">
        <Tabs.List>
          <Tabs.Tab value="filters" icon={<IconFilter size="0.8rem" />}>
            Filters
          </Tabs.Tab>
          <Tabs.Tab value="sort" icon={<IconArrowsSort size="0.8rem" />}>
            Sort
          </Tabs.Tab>
          <Tabs.Tab value="search" icon={<IconSearch size="0.8rem" />}>
            Search
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="filters" pt={15}>
          <Group spacing="xs">
            <Text fw={700}>Filters:</Text>
            <Button.Group>
              {Object.values(DisplayTypes).map(({ label, value }) => (
                <Button
                  variant={displayType === value ? 'filled' : 'light'}
                  onClick={() => handleDisplayFilter(value)}
                  key={value}
                >
                  {label}
                </Button>
              ))}
            </Button.Group>
          </Group>
        </Tabs.Panel>
        <Tabs.Panel value="sort" pt={15}>
          <Group spacing="xs">
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
    </Container>
  ) : null;
};

export default Filters;
