import { useDisclosure } from '@mantine/hooks';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmModal, { Props } from '../ConfirmModal';

const onConfirm = jest.fn();

const ModalWrapper = ({ title, message }: Pick<Props, 'title' | 'message'>) => {
  const [opened, { close }] = useDisclosure(true);

  return (
    <ConfirmModal
      opened={opened}
      closeModal={close}
      onConfirm={onConfirm}
      title={title}
      message={message}
    />
  );
};

describe('src/components/ConfirmModal', () => {
  test('Component renders', () => {
    render(
      <ModalWrapper title="My Modal Title" message="This is my message!" />
    );

    const message = screen.getByText(/this is my message/i);

    expect(message).toBeInTheDocument();
  });

  test('`No` button click closes modal', async () => {
    const user = userEvent.setup();

    render(
      <ModalWrapper title="My Modal Title" message="This is my message!" />
    );

    const modal = screen.getByRole('dialog');
    const button = screen.getByRole('button', { name: /no/i });

    await user.click(button);

    await waitFor(() => expect(modal).not.toBeInTheDocument());
  });

  test('`Yes` button click triggers `onConfirm` callback and closes modal', async () => {
    const user = userEvent.setup();

    render(
      <ModalWrapper title="My Modal Title" message="This is my message!" />
    );

    const modal = screen.getByRole('dialog');
    const button = screen.getByRole('button', { name: /yes/i });

    await user.click(button);

    await waitFor(() => expect(modal).not.toBeInTheDocument());
    expect(onConfirm).toHaveBeenCalled();
  });
});
