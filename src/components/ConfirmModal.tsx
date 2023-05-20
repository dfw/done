import { Button, Group, Modal, Stack, Text } from '@mantine/core';

export type Props = {
  opened: boolean;
  closeModal: () => void;
  title: string;
  alert?: React.ReactNode;
  message: string;
  onConfirm: () => void;
};

const ConfirmModal: React.FC<Props> = ({
  opened,
  closeModal,
  title,
  alert,
  message,
  onConfirm,
}) => {
  const handleConfirmClick = () => {
    onConfirm();
    closeModal();
  };

  return (
    <Modal opened={opened} onClose={closeModal} title={title}>
      <Stack>
        {alert}
        <Text>{message}</Text>
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
