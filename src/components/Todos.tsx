import { Container, Divider, Stack, Text } from '@mantine/core';
import { compareAsc, compareDesc, parseISO } from 'date-fns';
import { useTodosContext } from '../providers/TodosProvider';
import { isAscending, isDefaultSort, isDefaultFilter } from '../utils/todos';
import { EnumDisplayType, EnumSortType } from '../types/todos';
import Todo from './Todo';

const Todos: React.FC = () => {
  const {
    state: {
      todos: defaultTodos,
      sort: { type: sortType, direction: sortDirection },
      filters: { displayType: displayTypeFilter, tags: tagsFilter },
    },
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
      case EnumSortType.DueDate:
        todos = todos.sort((a, b) =>
          isAscending(sortDirection)
            ? compareAsc(parseISO(a.dueDate ?? ''), parseISO(b.dueDate ?? ''))
            : compareDesc(parseISO(a.dueDate ?? ''), parseISO(b.dueDate ?? ''))
        );
        break;
      default:
        break;
    }
  }

  if (!todos.length) {
    return (
      <Container mt={30}>
        <Text>No todos!</Text>
      </Container>
    );
  }

  return (
    <Container mt={15}>
      <Divider mb={15} size="sm" />
      <Stack spacing="sm" align="stretch">
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </Stack>
    </Container>
  );
};

export default Todos;
