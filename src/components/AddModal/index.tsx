import { Button, Group, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useTodosContext } from '../../providers/TodosProvider';

type Props = {
  opened: boolean;
  close: () => void;
};

const AddModal: React.FC<Props> = ({ opened, close }) => {
  const { dispatch } = useTodosContext();
  const form = useForm({
    initialValues: {
      text: '',
    },
    validate: {
      text: (value: string) => (value ? null : 'Text is required'),
    },
    validateInputOnChange: true,
  });

  const handleSubmit = async ({ text }: { text: string }) => {
    dispatch({
      type: 'add',
      payload: {
        text,
      },
    });

    close();

    form.reset();

    showNotification({
      message: 'Todo added.',
      title: 'Success',
      color: 'green',
    });
  };

  const handleClose = () => {
    close();

    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="What do you need to do?"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          placeholder="Watch Mad Men"
          data-autofocus
          {...form.getInputProps('text')}
        />
        <Group mt="md" position="right" spacing="md">
          <Button type="submit">Add</Button>
          <Button color="gray" onClick={handleClose}>
            Cancel
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default AddModal;
