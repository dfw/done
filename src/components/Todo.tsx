import styled from '@emotion/styled';
import {
  ActionIcon,
  Chip,
  Container,
  Group,
  Popover,
  Stack,
  TextInput,
} from '@mantine/core';
import { DatePicker as MantineDatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useFocusTrap } from '@mantine/hooks';
import { IconCalendarDue, IconPlus, IconTags } from '@tabler/icons-react';
import { EnumTag } from '../types/todos';
import { useTodosContext } from '../providers/TodosProvider';
import { TAGS } from '../utils/todos';

type FormValues = {
  name: string;
  tags: EnumTag[];
  dueDate: Date | null;
};

const DatePicker = styled(MantineDatePicker)`
  .mantine-DatePicker-day[data-today]:not([data-selected]) {
    background-color: ${({ theme }) =>
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[0]};
  }
`;

const Todo: React.FC = () => {
  const { dispatch } = useTodosContext();
  const focusTrapRef = useFocusTrap(true);
  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      tags: [],
      dueDate: null,
    },
  });

  const handleSubmit = async ({ name, tags, dueDate }: FormValues) => {
    dispatch({
      type: 'addTodo',
      payload: {
        name,
        tags,
        dueDate: dueDate ? dueDate.toISOString() : null,
      },
    });

    form.reset();
  };

  return (
    <Container>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="xs">
          <TextInput
            placeholder="What do you need to do?"
            size="md"
            ref={focusTrapRef}
            {...form.getInputProps('name')}
          />
          <Group spacing="xs">
            <Popover position="bottom-start" shadow="md">
              <Popover.Target>
                <ActionIcon
                  color="blue"
                  variant={!!form.values.tags.length ? 'filled' : 'light'}
                >
                  <IconTags />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <Stack align="center" spacing="xs">
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
                </Stack>
              </Popover.Dropdown>
            </Popover>
            <Popover position="bottom-start" shadow="md">
              <Popover.Target>
                <ActionIcon
                  color="blue"
                  variant={form.values.dueDate ? 'filled' : 'light'}
                >
                  <IconCalendarDue size={20} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <DatePicker
                  firstDayOfWeek={0}
                  weekdayFormat="ddd"
                  allowDeselect
                  {...form.getInputProps('dueDate')}
                />
              </Popover.Dropdown>
            </Popover>
            <ActionIcon
              type="submit"
              color="blue"
              variant="filled"
              ml="auto"
              disabled={!form.values.name}
            >
              <IconPlus />
            </ActionIcon>
          </Group>
        </Stack>
      </form>
    </Container>
  );
};

export default Todo;
