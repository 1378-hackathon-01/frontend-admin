import { Button, Flex, Message } from 'components';

interface IProps {
  onAcceptClick: () => void;
  onDeclineClick: () => void;
}

function StageDefault(props: IProps) {
  return (
    <Flex
      direction='column'
      gap={20}
    >
      <Message
        type='info'
        title='Подтвердите действие'
      >
        <p>
          Вы действительно хотите удалить учебное заведение? <br />
          Это приведёт к потере всех его данных!
        </p>
      </Message>

      <Flex
        justifyContent='center'
        gap={10}
      >
        <Button onClick={props.onAcceptClick}>Да</Button>
        <Button onClick={props.onDeclineClick}>Нет</Button>
      </Flex>
    </Flex>
  );
}

export default StageDefault;
