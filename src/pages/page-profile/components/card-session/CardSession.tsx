import { useEffect, useState } from 'react';
import { Box, Button, Flex, Header, Loader, Message } from 'components';
import { handleAuthOnly, handleErrorAsync } from 'common/handlers';
import { IAdminAuthFull } from 'common/models';
import { ApiAuth } from 'common/api';
import { AuthService } from 'common/services';
import { RoutingUrls } from 'common/const';

function CardSession() {
  const [auth, setAuth] = useState<IAdminAuthFull | null>(null);

  useEffect(() => {
    loadAuth();
  }, []);

  const loadAuth = async () =>
    await handleErrorAsync(async () => {
      await handleAuthOnly(async () => {
        const auth = await ApiAuth.getInstance().getCurrent();
        setAuth(auth);
      });
    });

  const handleLogoutClick = async () => {
    await handleErrorAsync(async () => {
      await handleAuthOnly(async () => {
        setAuth(null);

        await ApiAuth.getInstance().logoutCurrent();
        AuthService.getInstance().delete();
        window.location.assign(RoutingUrls.Auth);
      });
    });
  };

  return (
    <Box padding={20}>
      <Flex
        direction='column'
        gap={20}
      >
        <Header>Текущий сеанс</Header>

        {auth == null && (
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

        {auth != null && (
          <Flex
            direction='column'
            gap={20}
          >
            <Message
              type='info'
              title='Вы авторизованы'
            >
              <Flex direction='column'>
                <span>
                  <b>User-Agent:</b> <i>{auth.userAgent ?? 'Неизвестно...'}</i>
                </span>

                <span>
                  <b>IP-Адрес:</b> <i>{auth.ipAddress ?? 'Неизвестно...'}</i>
                </span>

                <span>
                  <b>Дата:</b> <i>{new Date(auth.createdAtUtc).toLocaleString()}</i>
                </span>
              </Flex>
            </Message>

            <Button
              color='01'
              onClick={handleLogoutClick}
            >
              Выйти из аккаунта
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default CardSession;
