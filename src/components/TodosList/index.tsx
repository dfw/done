import styled from '@emotion/styled';
import { Checkbox as MantineCheckbox, Stack } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useTodosContext } from '../../providers/TodosProvider';

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
        message: 'Done!',
        title: 'Success',
        color: 'green',
      });
    }
  };

  if (!todos.length) {
    return <p>No todos!</p>;
  }

  return (
    <Stack spacing="sm">
      {todos.map(({ id, text, done }) => (
        <Checkbox
          checked={done}
          key={id}
          label={text}
          name={id}
          onChange={handleChange}
        />
      ))}
    </Stack>
  );
};

export default TodosList;
