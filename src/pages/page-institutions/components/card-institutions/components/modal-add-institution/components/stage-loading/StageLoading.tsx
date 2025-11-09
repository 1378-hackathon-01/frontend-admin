import { Flex, Loader, Message } from 'components';

function StageLoading() {
  return (
    <Flex
      direction='column'
      gap={20}
    >
      <Flex
        justifyContent='center'
        alignItems='center'
      >
        <Loader
          size='default'
          variant='line'
          color='01'
        />
      </Flex>
      <Message
        type='warning'
        title='Загрузка'
      >
        <p>Дождитесь окончания добавления учебного заведения в сервис!</p>
      </Message>
    </Flex>
  );
}

export default StageLoading;
