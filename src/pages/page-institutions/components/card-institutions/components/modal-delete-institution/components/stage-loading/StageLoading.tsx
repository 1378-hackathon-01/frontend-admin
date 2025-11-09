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
          variant='line'
          size='default'
          color='01'
        />
      </Flex>

      <Message
        type='warning'
        title='Загрузка'
      >
        <p>Дождитесь окончания удаления учебного заведения...</p>
      </Message>
    </Flex>
  );
}

export default StageLoading;
