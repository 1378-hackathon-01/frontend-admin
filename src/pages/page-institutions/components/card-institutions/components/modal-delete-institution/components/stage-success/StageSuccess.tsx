import { Button, Flex, Message } from 'components';

interface IProps {
  onCloseClick: () => void;
}

function StageSuccess(props: IProps) {
  return (
    <Flex
      direction='column'
      gap={20}
    >
      <Message
        type='success'
        title='Удалено успешно'
      >
        <p>Учебное заведение и всего его данные были успешно удалены из сервиса!</p>
      </Message>

      <Button onClick={props.onCloseClick}>Закрыть</Button>
    </Flex>
  );
}

export default StageSuccess;
