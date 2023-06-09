import {
  Button,
  Chip,
  Container,
  Group,
  Stack,
  Tabs,
  Text,
} from '@mantine/core';
import { IconFilter, IconArrowsSort } from '@tabler/icons-react';
import { useTodosContext } from '../providers/TodosProvider';
import {
  EnumDisplayType,
  EnumSortDirection,
  EnumSortType,
  EnumTag,
} from '../types/todos';
import {
  DISPLAY_TYPES,
  SORT_TYPES,
  SORT_DIRECTIONS,
  TAGS,
} from '../utils/todos';

const Filters: React.FC = () => {
  const {
    state: {
      sort: { type: sortType, direction: sortDirection },
      filters: { displayType: displayTypeFilter, tags: tagsFilter },
      showFilters,
    },
    dispatch,
    mq: { xl: isExtraLargeViewport },
  } = useTodosContext();

  const handleDisplayFilterClick = (type: EnumDisplayType) => {
    if (type !== displayTypeFilter) {
      dispatch({
        type: 'filterDisplay',
        payload: {
          displayType: type,
        },
      });
    }
  };

  const handleTagFilterChange = (tags: EnumTag[]) => {
    dispatch({
      type: 'filterTags',
      payload: {
        tags,
      },
    });
  };

  const handleSortTypeClick = (type: EnumSortType) => {
    if (type !== sortType) {
      dispatch({
        type: 'changeSortType',
        payload: {
          type,
        },
      });
    }
  };

  const handleSortDirectionClick = (direction: EnumSortDirection) => {
    if (direction !== sortDirection) {
      dispatch({
        type: 'changeSortDirection',
        payload: {
          direction,
        },
      });
    }
  };

  return showFilters ? (
    <Container py={15}>
      <Tabs defaultValue="filters">
        <Tabs.List>
          <Tabs.Tab value="filters" icon={<IconFilter size={14} />}>
            Filters
          </Tabs.Tab>
          <Tabs.Tab value="sort" icon={<IconArrowsSort size={14} />}>
            Sort
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="filters" pt={15}>
          <Stack>
            <Group spacing="xs">
              <Text fz={isExtraLargeViewport ? 'md' : 'sm'} fw={700}>
                Display type:
              </Text>
              <Button.Group>
                {Object.values(DISPLAY_TYPES).map(({ label, value }) => (
                  <Button
                    variant={displayTypeFilter === value ? 'filled' : 'light'}
                    onClick={() => handleDisplayFilterClick(value)}
                    key={value}
                    size={isExtraLargeViewport ? 'sm' : 'xs'}
                  >
                    {label}
                  </Button>
                ))}
              </Button.Group>
            </Group>
            <Group spacing="xs">
              <Text fz={isExtraLargeViewport ? 'md' : 'sm'} fw={700}>
                Tags:
              </Text>
              <Group spacing="xs" position="center">
                <Chip.Group
                  multiple
                  value={tagsFilter}
                  onChange={handleTagFilterChange}
                >
                  {Object.values(TAGS).map(({ label, value, color }) => (
                    <Chip
                      value={value}
                      variant="filled"
                      color={color}
                      key={value}
                      size={isExtraLargeViewport ? 'md' : 'sm'}
                    >
                      {label}
                    </Chip>
                  ))}
                </Chip.Group>
              </Group>
            </Group>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="sort" pt={15}>
          <Group spacing="xs">
            <Text fz={isExtraLargeViewport ? 'md' : 'sm'} fw={700}>
              Sort by:
            </Text>
            <Button.Group>
              {Object.values(SORT_TYPES).map(({ label, value }) => (
                <Button
                  variant={sortType === value ? 'filled' : 'light'}
                  onClick={() => handleSortTypeClick(value)}
                  key={value}
                  size={isExtraLargeViewport ? 'sm' : 'xs'}
                >
                  {label}
                </Button>
              ))}
            </Button.Group>
            <Button.Group>
              {Object.values(SORT_DIRECTIONS).map(({ icon: Icon, value }) => (
                <Button
                  variant={sortDirection === value ? 'filled' : 'light'}
                  onClick={() => handleSortDirectionClick(value)}
                  key={value}
                  size={isExtraLargeViewport ? 'sm' : 'xs'}
                >
                  <Icon />
                </Button>
              ))}
            </Button.Group>
          </Group>
        </Tabs.Panel>
      </Tabs>
    </Container>
  ) : null;
};

export default Filters;
