import { ApiTokens } from 'common/api';
import { handleAuthOnly, handleError } from 'common/handlers';
import { IAdminApiTokenPostFull } from 'common/models';
import { Button, Flex, Input, Loader, Message, Modal } from 'components';
import { useEffect, useState } from 'react';

interface IProps {
  onClose: () => void;
}

function ModalCreateToken(props: IProps) {
  const [token, setToken] = useState<IAdminApiTokenPostFull | null>(null);

  useEffect(() => {
    createToken();
  }, []);

  const createToken = async () =>
    await handleError(
      async () =>
        await handleAuthOnly(async () => {
          const token = await ApiTokens.getInstance().create();
          setToken(token);
        })
    );

  return (
    <Modal
      size={400}
      header='Создание токена'
      onClose={token != null ? props.onClose : undefined}
    >
      {token == null && (
        <Flex
          direction='column'
          gap={10}
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
              size='default'
              variant='line'
              color='01'
            />
            <div />
            <div />
          </Flex>
          <Message
            type='warning'
            title='Ожидайте...'
          >
            <p>Дождитесь завершения формирования API-Токена</p>
          </Message>
        </Flex>
      )}

      {token != null && (
        <Flex
          direction='column'
          gap={10}
        >
          <Input
            type='text'
            value={token.token}
            readonly
          />
          <Message
            type='success'
            title='API-Токен создан'
          >
            <p>API-токен был успешно создан, скопируйте его из текстового поля выше!</p>
          </Message>
          <Button onClick={props.onClose}>Закрыть</Button>
        </Flex>
      )}
    </Modal>
  );
}

export default ModalCreateToken;
