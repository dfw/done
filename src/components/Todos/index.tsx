import styled from '@emotion/styled';
import {
  Badge,
  Checkbox as MantineCheckbox,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { compareAsc, compareDesc, format, parseISO } from 'date-fns';
import { useTodosContext } from '../../providers/TodosProvider';
import {
  TagColors,
  isAscending,
  isDefaultSort,
  isDefaultFilter,
} from '../../utils/todos';
import { EnumShow, EnumSortType } from '../../types/todos';

const Checkbox = styled(MantineCheckbox)`
  text-decoration: ${(props) => (props.checked ? 'line-through' : 'none')};
  user-select: none;
`;

const Todos: React.FC = () => {
  const {
    state: {
      todos: defaultTodos,
      sort: { type: sortType, direction: sortDirection },
      filters: { show: showFilter },
    },
    dispatch,
  } = useTodosContext();

  let todos = [...defaultTodos];

  if (!isDefaultFilter(showFilter)) {
    const done = showFilter === EnumShow.Done;

    todos = todos.filter((todo) => {
      return todo.done === done;
    });
  }

  if (!isDefaultSort(sortType, sortDirection)) {
    switch (sortType) {
      case EnumSortType.DateAdded:
        todos = todos.sort((a, b) =>
          isAscending(sortDirection)
            ? compareAsc(parseISO(a.dateAdded), parseISO(b.dateAdded))
            : compareDesc(parseISO(a.dateAdded), parseISO(b.dateAdded))
        );
        break;
      case EnumSortType.DateUpdated:
        todos = todos.sort((a, b) => {
          const dateA = a.dateUpdated ?? a.dateAdded;
          const dateB = b.dateUpdated ?? b.dateAdded;

          return isAscending(sortDirection)
            ? compareAsc(parseISO(dateA), parseISO(dateB))
            : compareDesc(parseISO(dateA), parseISO(dateB));
        });
        break;
      default:
        break;
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'check',
      payload: {
        id: e.target.name,
        done: e.target.checked,
      },
    });

    if (e.target.checked) {
      showNotification({
        title: 'Success',
        message: 'Done!',
        color: 'green',
      });
    }
  };

  if (!todos.length) {
    return <Text mt={30}>No todos!</Text>;
  }

  return (
    <>
      <Stack spacing="sm" mt={30}>
        {todos.map(({ id, name, done, tags, dueDate }) => (
          <Group spacing="xs" key={id}>
            <Checkbox
              checked={done}
              label={name}
              name={id}
              onChange={handleChange}
              size="md"
            />
            <Group spacing="xs">
              {dueDate ? (
                <Badge size="sm" color="gray">
                  {format(new Date(dueDate), 'MMM d')}
                </Badge>
              ) : null}
              {tags.map((tag) => (
                <Badge variant="filled" size="sm" color={TagColors[tag]}>
                  {tag}
                </Badge>
              ))}
            </Group>
          </Group>
        ))}
      </Stack>
    </>
  );
};

export default Todos;
