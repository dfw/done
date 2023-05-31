import { useState } from 'react';
import styled from '@emotion/styled';
import {
  ActionIcon,
  Badge,
  Button,
  Checkbox as MantineCheckbox,
  Chip,
  Container,
  Group,
  Menu,
  Popover,
  Stack,
  TextInput,
} from '@mantine/core';
import {
  DatePickerValue,
  DatePicker as MantineDatePicker,
} from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useFocusTrap, useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import {
  IconCalendarDue,
  IconDots,
  IconEdit,
  IconTags,
  IconTrash,
} from '@tabler/icons-react';
import { format } from 'date-fns';
import { EnumTag, TypeTodo, TypeTodoMode } from '../types/todos';
import { useTodosContext } from '../providers/TodosProvider';
import { TAGS } from '../utils/todos';

type FormValues = {
  id: string;
  name: string;
  tags: EnumTag[];
  dueDate: Date | null;
};

type Props =
  | {
      initialMode?: Extract<TypeTodoMode, 'add'>;
      todo?: TypeTodo;
    }
  | {
      initialMode?: Exclude<TypeTodoMode, 'add'>;
      todo: TypeTodo;
    };

const Checkbox = styled(MantineCheckbox)`
  text-decoration: ${(props) => (props.checked ? 'line-through' : 'none')};
  user-select: none;
`;

const DatePicker = styled(MantineDatePicker)`
  .mantine-DatePicker-day[data-today]:not([data-selected]) {
    background-color: ${({ theme }) =>
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[0]};
  }
`;

const Todo: React.FC<Props> = ({ initialMode = 'view', todo }) => {
  const { dispatch } = useTodosContext();
  const focusTrapRef = useFocusTrap(true);
  const [
    calendarPopoverOpened,
    { toggle: toggleCalendarPopover, close: closeCalendarPopover },
  ] = useDisclosure(false);
  const [mode, setMode] = useState(initialMode);
  const form = useForm<FormValues>({
    initialValues: {
      id: todo?.id ?? '',
      name: todo?.name ?? '',
      tags: todo?.tags ?? [],
      dueDate: todo?.dueDate ? new Date(todo.dueDate) : null,
    },
  });

  const isAddMode = mode === 'add';

  const editTodo = () => setMode('edit');

  const viewTodo = () => setMode('view');

  const handleSubmit = async ({ id, name, tags, dueDate }: FormValues) => {
    if (isAddMode) {
      dispatch({
        type: 'addTodo',
        payload: {
          name,
          tags,
          dueDate: dueDate ? dueDate.toISOString() : null,
        },
      });

      form.reset();
    } else {
      dispatch({
        type: 'updateTodo',
        payload: {
          id,
          name,
          tags,
          dueDate: dueDate ? dueDate.toISOString() : null,
        },
      });

      viewTodo();
    }
  };

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

  const handleDeleteTodo = () => {
    if (!todo?.id) {
      return;
    }

    dispatch({
      type: 'deleteTodo',
      payload: {
        id: todo.id,
      },
    });
  };

  const handleDatePickerChange = (value: DatePickerValue) => {
    form.getInputProps('dueDate').onChange(value);
    closeCalendarPopover();
  };

  if (mode === 'view' && todo) {
    return (
      <Group spacing="xs" position="apart" data-testid="todo">
        <Checkbox
          checked={todo.done}
          label={todo.name}
          name={todo.id}
          onChange={handleCheckTodo}
          size="md"
        />
        <Group spacing="xs">
          {todo?.dueDate ? (
            <Badge size="sm" color="gray">
              {format(new Date(todo.dueDate), 'MMM d')}
            </Badge>
          ) : null}
          {todo?.tags.map((tag) => (
            <Badge variant="filled" size="sm" color={TAGS[tag].color} key={tag}>
              {tag}
            </Badge>
          ))}
          <Menu position="bottom-end" shadow="md">
            <Menu.Target>
              <ActionIcon size="sm">
                <IconDots size={20} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={editTodo} icon={<IconEdit size={14} />}>
                Edit
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                onClick={handleDeleteTodo}
                color="red"
                icon={<IconTrash size={14} />}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    );
  }

  return (
    <Container w="100%" px={isAddMode ? '1rem' : '0'}>
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
                  data-testid="tags-button"
                >
                  <IconTags />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown data-testid="tags-popover">
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
            <Popover
              opened={calendarPopoverOpened}
              onChange={closeCalendarPopover}
              position="bottom-start"
              shadow="md"
            >
              <Popover.Target>
                <ActionIcon
                  color="blue"
                  variant={form.values.dueDate ? 'filled' : 'light'}
                  onClick={toggleCalendarPopover}
                  data-testid="calendar-button"
                >
                  <IconCalendarDue size={20} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown data-testid="calendar-popover">
                <DatePicker
                  firstDayOfWeek={0}
                  weekdayFormat="ddd"
                  allowDeselect
                  {...form.getInputProps('dueDate')}
                  onChange={handleDatePickerChange}
                />
              </Popover.Dropdown>
            </Popover>
            {isAddMode ? (
              <Button
                type="submit"
                ml="auto"
                size="xs"
                disabled={!form.values.name}
              >
                Add
              </Button>
            ) : (
              <Group spacing="xs" ml="auto">
                <Button type="submit" size="xs" disabled={!form.values.name}>
                  Save
                </Button>
                <Button size="xs" color="gray" onClick={viewTodo}>
                  Cancel
                </Button>
              </Group>
            )}
          </Group>
        </Stack>
      </form>
    </Container>
  );
};

export default Todo;
