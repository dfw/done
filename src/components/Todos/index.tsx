import styled from '@emotion/styled';
import {
  Badge,
  Checkbox as MantineCheckbox,
  Container,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { compareAsc, compareDesc, format, parseISO } from 'date-fns';
import { useTodosContext } from '../../providers/TodosProvider';
import {
  isAscending,
  isDefaultSort,
  isDefaultFilter,
  TAGS,
} from '../../utils/todos';
import { EnumDisplayType, EnumSortType } from '../../types/todos';

const Checkbox = styled(MantineCheckbox)`
  text-decoration: ${(props) => (props.checked ? 'line-through' : 'none')};
  user-select: none;
`;

const Todos: React.FC = () => {
  const {
    state: {
      todos: defaultTodos,
      sort: { type: sortType, direction: sortDirection },
      filters: { displayType: displayTypeFilter, tags: tagsFilter },
    },
    dispatch,
  } = useTodosContext();

  let todos = [...defaultTodos];

  if (!isDefaultFilter(displayTypeFilter)) {
    const done = displayTypeFilter === EnumDisplayType.Done;

    todos = todos.filter((todo) => {
      return todo.done === done;
    });
  }

  if (!!tagsFilter.length) {
    todos = todos.filter(({ tags }) => {
      return tags.some((tag) => tagsFilter.includes(tag));
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

  const handleCheckTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'checkTodo',
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
    return (
      <Container mt={30}>
        <Text>No todos!</Text>
      </Container>
    );
  }

  return (
    <Container mt={15}>
      <Stack spacing="sm">
        {todos.map(({ id, name, done, tags, dueDate }) => (
          <Group spacing="xs" key={id}>
            <Checkbox
              checked={done}
              label={name}
              name={id}
              onChange={handleCheckTodo}
              size="md"
            />
            <Group spacing="xs">
              {dueDate ? (
                <Badge size="sm" color="gray">
                  {format(new Date(dueDate), 'MMM d')}
                </Badge>
              ) : null}
              {tags.map((tag) => (
                <Badge
                  variant="filled"
                  size="sm"
                  color={TAGS[tag].color}
                  key="tag"
                >
                  {tag}
                </Badge>
              ))}
            </Group>
          </Group>
        ))}
      </Stack>
    </Container>
  );
};

export default Todos;
