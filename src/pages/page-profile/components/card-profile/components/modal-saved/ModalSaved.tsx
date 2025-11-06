import { Button, Flex, Message, Modal } from 'components';

interface IProps {
  onClose: () => void;
}

function ModalSaved(props: IProps) {
  return (
    <Modal
      size={400}
      onClose={props.onClose}
      header='Сохранено'
    >
      <Flex
        direction='column'
        gap={20}
      >
        <Message
          type='success'
          title='Сохранение завершено'
        >
          <p>Данные сохранены успешно!</p>
          <p>Внесённые вами изменены были применены.</p>
        </Message>

        <Button onClick={props.onClose}>Закрыть</Button>
      </Flex>
    </Modal>
  );
}

export default ModalSaved;
