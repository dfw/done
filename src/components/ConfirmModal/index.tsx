import { Alert, Button, Group, Modal, Stack, Text } from '@mantine/core';
import { IconAlertTriangleFilled } from '@tabler/icons-react';
import { useTodosContext } from '../../providers/TodosProvider';

type Props = {
  opened: boolean;
  closeModal: () => void;
  title: string;
};

const ConfirmModal: React.FC<Props> = ({ opened, closeModal, title }) => {
  const { dispatch } = useTodosContext();

  const handleConfirmClick = () => {
    dispatch({
      type: 'deleteAllTodos',
    });

    closeModal();
  };

  return (
    <Modal opened={opened} onClose={closeModal} title={title}>
      <Stack>
        <Alert icon={<IconAlertTriangleFilled />} title="Warning!" color="red">
          This will permanently delete all your todos.
        </Alert>
        <Text>Are you sure you want to delete all your todos?</Text>
        <Group position="right" spacing="sm">
          <Button color="red" onClick={handleConfirmClick}>
            Yes
          </Button>
          <Button color="gray" onClick={closeModal}>
            No
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ConfirmModal;
