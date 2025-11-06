import * as bi from 'react-bootstrap-icons';
import { atomUser } from 'common/atoms';
import { Box, Flex, Header } from 'components';
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

        <Flex
          direction='column'
          gap={5}
        >
          <CardLink
            icon={<bi.Person />}
            label='Настройки профиля'
            href={RoutingUrls.Profile}
          />

          <CardLink
            icon={<bi.Buildings />}
            label='Список учебных заведений'
            href={RoutingUrls.Main}
          />

          <CardLink
            icon={<bi.People />}
            label='Управление пользователями'
            href={RoutingUrls.Main}
          />

          <CardLink
            icon={<bi.Lock />}
            label='Управление API-Токенами'
            href={RoutingUrls.Main}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default CardUser;
