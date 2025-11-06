import { useEffect, useState } from 'react';
import { Box, Button, Flex, Header, Loader, Message } from 'components';
import { handleErrorAsync, handleAuthOnly } from 'common/handlers';
import { IAdminAuthFull } from 'common/models';
import { ApiAuth } from 'common/api';

function CardSessions() {
  const [auths, setAuths] = useState<IAdminAuthFull[] | null>(null);

  useEffect(() => {
    loadAuths();
  }, []);

  const loadAuths = async () =>
    await handleErrorAsync(async () => {
      await handleAuthOnly(async () => {
        const auths = await ApiAuth.getInstance().getAll();
        setAuths(auths);
      });
    });

  const handleLogoutClick = async (auth: IAdminAuthFull) =>
    await handleErrorAsync(async () => {
      await handleAuthOnly(async () => {
        const updatedAuths = auths?.filter((x) => x.id != auth.id) ?? null;
        setAuths(updatedAuths);

        await ApiAuth.getInstance().logout(auth.id);
      });
    });

  return (
    <Box padding={20}>
      <Flex
        direction='column'
        gap={20}
      >
        <Header>Другие сеансы</Header>

        {auths == null && (
          <Flex
            direction='column'
            justifyContent='center'
            alignItems='center'
            gap={40}
          >
            <div />
            <div />
            <Loader
              variant='line'
              size='small'
              color='01'
            />
            <div />
            <div />
          </Flex>
        )}

        {auths != null && auths.length === 0 && (
          <Message
            type='success'
            title='Других авторизаций нет'
          >
            <p>Это авторизация - единственная.</p>
            <p>Если вы войдёте в аккаунт в другом браузере или на другом устройства - сессия отобразиться здесь.</p>
          </Message>
        )}

        {auths != null && auths.length > 0 && (
          <Flex
            direction='column'
            gap={10}
          >
            {auths.map((x) => (
              <CardSession
                key={x.id}
                auth={x}
                onLogoutClick={() => handleLogoutClick(x)}
              />
            ))}
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

function CardSession(props: { auth: IAdminAuthFull; onLogoutClick: () => void }) {
  return (
    <Message
      type='warning'
      title='Сторонняя авторизация'
    >
      <Flex
        direction='column'
        gap={10}
      >
        <Flex direction='column'>
          <span>
            <b>User-Agent:</b> <i>{props.auth.userAgent ?? 'Неизвестно...'}</i>
          </span>

          <span>
            <b>IP-Адрес:</b> <i>{props.auth.ipAddress ?? 'Неизвестно...'}</i>
          </span>

          <span>
            <b>Дата:</b> <i>{new Date(props.auth.createdAtUtc).toLocaleString()}</i>
          </span>
        </Flex>

        <Button
          padding={5}
          fontSize={0.9}
          color='01-transparent'
          onClick={props.onLogoutClick}
        >
          Завершить сессию
        </Button>
      </Flex>
    </Message>
  );
}

export default CardSessions;
