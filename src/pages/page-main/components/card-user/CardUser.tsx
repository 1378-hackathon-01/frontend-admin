import * as bi from 'react-bootstrap-icons';
import { atomUser } from 'common/atoms';
import { Box, Flex, Header, Message } from 'components';
import { useRecoilValue } from 'recoil';
import { CardLink } from './components';
import { RoutingUrls } from 'common/const';

function CardUser() {
  const user = useRecoilValue(atomUser);

  if (user == null) {
    return (
      <Box padding={20}>
        <Header>Вход не выполнен!</Header>
      </Box>
    );
  }

  return (
    <Box padding={20}>
      <Flex
        direction='column'
        gap={20}
      >
        <Header>Добро пожаловать, {user.fullName}</Header>

        <Message
          type='info'
          title='Подсказка'
        >
          <p>
            Вы попали в панель главного администратора образовательной платформы <b>STUDGRAM</b>!
          </p>
          <p>
            Здесь вы можете базово управлять учебными заведениями и API-токенами платформы для интеграции со сторонними
            приложениями.
          </p>
          <p>
            Если вы использовали для входа стандартный пароль - настоятельно рекомендуем изменить его в настройках
            профиля!
          </p>
        </Message>

        <Flex
          direction='column'
          gap={20}
        >
          <Flex
            direction='column'
            gap={5}
          >
            <CardLink
              icon={<bi.Buildings />}
              label='Управление учебными заведениями'
              href={RoutingUrls.Institutions}
            />

            <CardLink
              icon={<bi.Lock />}
              label='Управление API-Токенами'
              href={RoutingUrls.Tokens}
            />
          </Flex>

          <Flex
            direction='column'
            gap={5}
          >
            <CardLink
              icon={<bi.Person />}
              label='Настройки профиля'
              href={RoutingUrls.Profile}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CardUser;
