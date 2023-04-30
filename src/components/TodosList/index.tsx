import styled from '@emotion/styled';
import {
  Badge,
  Checkbox as MantineCheckbox,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useTodosContext } from '../../providers/TodosProvider';
import { TagColors } from '../../utils/todos';
import Header from './Header';

const Checkbox = styled(MantineCheckbox)`
  text-decoration: ${(props) => (props.checked ? 'line-through' : 'none')};
  user-select: none;
`;

const TodosList: React.FC = () => {
  const {
    state: { todos },
    dispatch,
  } = useTodosContext();

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
    return (
      <>
        {/* <Header /> */}
        <Text fz="lg">No todos!</Text>
      </>
    );
  }

  return (
    <>
      {/* <Header /> */}
      <Stack spacing="sm">
        {todos.map(({ id, name, done, tags }) => (
          <Group spacing="xs">
            <Checkbox
              checked={done}
              key={id}
              label={name}
              name={id}
              onChange={handleChange}
              size="md"
            />
            <Group spacing="xs">
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

export default TodosList;
