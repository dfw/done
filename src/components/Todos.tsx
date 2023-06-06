import { Container, Divider, Stack, Text } from '@mantine/core';
import { orderBy } from 'lodash';
import { useTodosContext } from '../providers/TodosProvider';
import {
  isDefaultSort,
  filterTodos,
  sortTodos,
  isDefaultFilter,
} from '../utils/todos';
import Todo from './Todo';
import { EnumSortDirection, EnumSortType } from '../types/todos';

const Todos: React.FC = () => {
  const {
    state: {
      todos: defaultTodos,
      sort: { type: sortType, direction: sortDirection },
      filters: { displayType: displayTypeFilter, tags: tagsFilter },
    },
    mq: { xl: isExtraLargeViewport },
  } = useTodosContext();

  // Default sort
  let todos = orderBy(
    defaultTodos,
    EnumSortType.DateAdded,
    EnumSortDirection.Descending
  );

  // Apply filters
  if (!isDefaultFilter(displayTypeFilter) || !!tagsFilter.length) {
    todos = filterTodos(todos, displayTypeFilter, tagsFilter);
  }

  // Apply custom sort
  if (!isDefaultSort(sortType, sortDirection)) {
    todos = sortTodos(todos, sortType, sortDirection);
  }

  if (!todos.length) {
    return (
      <Container mt={30}>
        <Text>No to-dos!</Text>
      </Container>
    );
  }

  return (
    <Container mt={isExtraLargeViewport ? 30 : 15}>
      <Divider mb={isExtraLargeViewport ? 30 : 15} size="sm" />
      <Stack spacing={isExtraLargeViewport ? 'md' : 'sm'}>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </Stack>
    </Container>
  );
};

export default Todos;
