import { ApiTokens } from 'common/api';
import { handleAuthOnly, handleErrorAsync } from 'common/handlers';
import { IAdminApiTokenFull } from 'common/models';
import { Button, Flex, Loader, Message, Modal, TextContent } from 'components';
import { useState } from 'react';

type Stage = 'default' | 'loading' | 'success';

interface IProps {
  token: IAdminApiTokenFull;
  onClose: () => void;
}

function ModalDeleteToken(props: IProps) {
  const [stage, setStage] = useState<Stage>('default');

  const handleDeleteClick = async () =>
    await handleErrorAsync(
      async () =>
        await handleAuthOnly(async () => {
          setStage('loading');
          await ApiTokens.getInstance().delete(props.token.id);
          setStage('success');
        })
    );

  return (
    <Modal
      size={400}
      header='Удаление API-токена'
      onClose={stage !== 'loading' ? props.onClose : undefined}
    >
      {stage === 'default' && (
        <Flex
          direction='column'
          gap={20}
        >
          <TextContent align='center'>Вы действительно хотите удалить API-токен?</TextContent>

          <Flex
            justifyContent='center'
            gap={10}
          >
            <Button onClick={handleDeleteClick}>Да</Button>
            <Button onClick={props.onClose}>Нет</Button>
          </Flex>
        </Flex>
      )}

      {stage === 'loading' && (
        <Flex
          direction='column'
          gap={20}
        >
          <Flex
            direction='column'
            justifyContent='center'
            alignItems='center'
            gap={20}
          >
            <div />
            <div />
            <Loader
              variant='line'
              size='default'
              color='01'
            />
            <div />
            <div />
          </Flex>

          <Message
            type='warning'
            title='Ожидайте...'
          >
            <p>Дождитесь окончания удаления API-токена...</p>
          </Message>
        </Flex>
      )}

      {stage === 'success' && (
        <Flex
          direction='column'
          gap={20}
        >
          <Message
            type='success'
            title='Успешно'
          >
            <p>API-токен был успешно удалён!</p>
          </Message>

          <Button onClick={props.onClose}>Закрыть</Button>
        </Flex>
      )}
    </Modal>
  );
}

export default ModalDeleteToken;
