import * as bi from 'react-bootstrap-icons';
import { RoutingUrls } from 'common/const';
import { Box, Button, Flex, Header, Message } from 'components';
import './style.scss';

function CardNoAccess() {
  return (
    <Box
      padding={20}
      className='card-no-access-groy'
    >
      <Flex
        direction='column'
        gap={20}
      >
        <Header>Нет доступа!</Header>

        <Flex
          direction='column'
          gap={5}
        >
          <Message
            type='error'
            title='Недостаточно прав'
          >
            <Flex
              className='err-icon-cntr-8g4m'
              justifyContent='center'
              alignItems='center'
            >
              <bi.XCircle />
            </Flex>

            <p>
              У вас нет прав для доступа в этот раздел! <br />
              Вы не можете просматривать или редактировать содержимое этого раздела.
            </p>
          </Message>
          <Button href={RoutingUrls.Main}>Главная страница</Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CardNoAccess;
