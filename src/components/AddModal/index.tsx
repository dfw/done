import {
  ActionIcon,
  Button,
  Chip,
  Collapse,
  Group,
  Modal,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconTags } from '@tabler/icons-react';
import { useTodosContext } from '../../providers/TodosProvider';
import { Tags, TagColors } from '../../utils/todos';
import { EnumTag } from '../../types/todos';

type Props = {
  opened: boolean;
  closeModal: () => void;
};

type FormValues = {
  name: string;
  tags: EnumTag[];
};

const AddModal: React.FC<Props> = ({ opened, closeModal }) => {
  const { dispatch } = useTodosContext();
  const [tagsOpened, { toggle: toggleTags, close: closeTags }] =
    useDisclosure(false);
  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      tags: [],
    },
    validate: {
      name: (value: string) => (value ? null : 'Todo name is required'),
    },
    validateInputOnChange: true,
  });

  const handleSubmit = async ({ name, tags }: FormValues) => {
    dispatch({
      type: 'add',
      payload: {
        name,
        tags,
      },
    });

    closeModal();

    closeTags();

    form.reset();

    showNotification({
      title: 'Success',
      message: 'Todo added.',
      color: 'green',
    });
  };

  const handleClose = () => {
    closeModal();

    closeTags();

    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="What do you need to do?"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="sm">
          <TextInput
            placeholder="Watch Mad Men"
            data-autofocus
            {...form.getInputProps('name')}
          />
          <ActionIcon onClick={toggleTags}>
            <IconTags />
          </ActionIcon>
          <Collapse in={tagsOpened} transitionDuration={250}>
            <Group spacing="xs">
              <Chip.Group multiple {...form.getInputProps('tags')}>
                {Tags.map(({ label }) => (
                  <Chip value={label} variant="filled" color={TagColors[label]}>
                    {label}
                  </Chip>
                ))}
              </Chip.Group>
            </Group>
          </Collapse>
        </Stack>
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
