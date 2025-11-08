import { useEffect, useState } from 'react';
import { ApiTokens } from 'common/api';
import { IAdminApiTokenFull } from 'common/models';
import { handleAuthOnly, handleErrorAsync } from 'common/handlers';
import { Box, Button, Flex, Header, Loader, Message } from 'components';
import { CardToken, ModalCreateToken } from './components';
import './style.scss';
import ModalDeleteToken from './components/modal-delete-token/ModalDeleteToken';

interface IProps {
  canWrite: boolean;
}

function CardTokens(props: IProps) {
  const [tokens, setTokens] = useState<IAdminApiTokenFull[] | null>(null);
  const [deleteModal, setDeleteModal] = useState<IAdminApiTokenFull | null>(null);
  const [createModal, setCreateModal] = useState<boolean>(false);

  useEffect(() => {
    loadTokens();
  }, []);

  const loadTokens = async () =>
    await handleErrorAsync(async () =>
      handleAuthOnly(async () => {
        const tokens = await ApiTokens.getInstance().getAll();
        setTokens(tokens);
      })
    );

  const handleModalCloseClick = () => {
    setCreateModal(false);
    setDeleteModal(null);

    setTokens(null);
    loadTokens();
  };

  return (
    <Box
      className='card-tokens-p055'
      padding={20}
    >
      {deleteModal && (
        <ModalDeleteToken
          token={deleteModal}
          onClose={handleModalCloseClick}
        />
      )}
      {createModal && <ModalCreateToken onClose={handleModalCloseClick} />}
      <Flex
        direction='column'
        gap={20}
      >
        <Header>Список API-Токенов</Header>

        {tokens != null && (
          <Flex
            direction='column'
            gap={10}
          >
            {tokens.length > 0 && (
              <Message
                type='info'
                title='Подсказка'
              >
                <p>
                  Ключ токена отображается и доступен только при создании. <br />
                  После создания API-токена просмотреть его ключ <b>невозможно</b>.
                </p>
                <p>
                  Это сделано для защиты данных пользователей и сторонних разработчиков при утечке авторизационных
                  данных от панели администратора.
                </p>
              </Message>
            )}

            {props.canWrite && (
              <Flex justifyContent='flex-end'>
                <Button onClick={() => setCreateModal(true)}>Новый API-Токен</Button>
              </Flex>
            )}

            {tokens.length === 0 && (
              <Message
                type='warning'
                title='Нет ни одного API-токена'
              >
                <p>Создайте хотя бы один токен, чтобы он отобразился здесь.</p>
              </Message>
            )}

            {tokens.map((x) => (
              <CardToken
                key={x.id}
                token={x}
                canDelete={props.canWrite}
                onDeleteClick={() => setDeleteModal(x)}
              />
            ))}
          </Flex>
        )}

        {tokens == null && (
          <Flex
            className='loader-cntr-ksn0'
            justifyContent='center'
            alignItems='center'
          >
            <Loader
              variant='line'
              color='01'
              size='default'
            />
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default CardTokens;
