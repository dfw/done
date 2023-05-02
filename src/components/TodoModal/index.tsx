import {
  ActionIcon,
  Button,
  Center,
  Chip,
  Collapse,
  Group,
  Modal,
  Stack,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconTags, IconCalendarDue } from '@tabler/icons-react';
import { useTodosContext } from '../../providers/TodosProvider';
import { TAGS } from '../../utils/todos';
import { EnumTag } from '../../types/todos';

type Props = {
  opened: boolean;
  closeModal: () => void;
};

type FormValues = {
  name: string;
  tags: EnumTag[];
  dueDate: Date | null;
};

const TodoModal: React.FC<Props> = ({ opened, closeModal }) => {
  const { dispatch } = useTodosContext();
  const [tagsOpened, { toggle: toggleTags, close: closeTags }] =
    useDisclosure(false);
  const [calendarOpened, { toggle: toggleCalendar, close: closeCalendar }] =
    useDisclosure(false);
  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      tags: [],
      dueDate: null,
    },
    validate: {
      name: (value: string) => (value ? null : 'Todo name is required'),
    },
    validateInputOnChange: true,
  });

  const closeAndReset = () => {
    closeModal();
    closeTags();
    closeCalendar();
    form.reset();
  };

  const handleSubmit = async ({ name, tags, dueDate }: FormValues) => {
    dispatch({
      type: 'addTodo',
      payload: {
        name,
        tags,
        dueDate: dueDate ? dueDate.toISOString() : null,
      },
    });

    closeAndReset();

    showNotification({
      title: 'Success',
      message: 'Todo added.',
      color: 'green',
    });
  };

  const handleClose = () => {
    closeAndReset();
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
            label="Todo Name"
            size="md"
            data-autofocus
            withAsterisk
            {...form.getInputProps('name')}
          />
          <Group spacing="xs">
            <ActionIcon onClick={toggleTags}>
              <IconTags />
            </ActionIcon>
            <ActionIcon onClick={toggleCalendar}>
              <IconCalendarDue size={20} />
            </ActionIcon>
          </Group>
          <Collapse in={tagsOpened} transitionDuration={150}>
            <Group spacing="xs" position="center">
              <Chip.Group multiple {...form.getInputProps('tags')}>
                {Object.values(TAGS).map(({ label, value, color }) => (
                  <Chip
                    value={value}
                    variant="filled"
                    color={color}
                    key={value}
                  >
                    {label}
                  </Chip>
                ))}
              </Chip.Group>
            </Group>
          </Collapse>
          <Collapse in={calendarOpened} transitionDuration={150}>
            <Center>
              <DatePicker
                firstDayOfWeek={0}
                weekdayFormat="ddd"
                allowDeselect
                {...form.getInputProps('dueDate')}
              />
            </Center>
          </Collapse>
        </Stack>
        <Group mt="md" position="right" spacing="sm">
          <Button type="submit">Add</Button>
          <Button color="gray" onClick={handleClose}>
            Cancel
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default TodoModal;
