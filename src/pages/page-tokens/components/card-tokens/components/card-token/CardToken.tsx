import { IAdminApiTokenFull } from 'common/models';
import { Button, Flex, Header } from 'components';
import './style.scss';

interface IProps {
  token: IAdminApiTokenFull;
  canDelete: boolean;
  onDeleteClick: () => void;
}

function CardToken(props: IProps) {
  return (
    <Flex
      className='token-x9kk'
      direction='column'
      gap={20}
    >
      <Flex direction='column'>
        <Header>API-Токен</Header>
        <span>
          <b>Дата: </b> {new Date(props.token.createdAtUtc).toLocaleString()}
        </span>
      </Flex>
      {props.canDelete && (
        <Button
          onClick={props.onDeleteClick}
          color='01'
          padding={5}
        >
          Удалить API-Токен
        </Button>
      )}
    </Flex>
  );
}

export default CardToken;
