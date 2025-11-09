import * as bi from 'react-bootstrap-icons';
import { IAdminInstitutionPostFull } from 'common/models';
import { Button, Flex, Input, Message } from 'components';

interface IProps {
  creationResult: IAdminInstitutionPostFull;
  onCloseClick: () => void;
}

function StageSuccess(props: IProps) {
  return (
    <Flex
      direction='column'
      gap={20}
    >
      <Message
        type='success'
        title='Добавление успешно!'
      >
        <p>Учебное заведение было успешно добавлено в сервис!</p>
        <p>
          Сохраните представленные ниже авторизационные данные пользователя-администратора учебного заведения в надёжном
          месте.
          <br />
          Повторно посмотреть эти данные будет невозможно!
        </p>
      </Message>

      <Flex
        direction='column'
        gap={5}
      >
        <Input
          type='text'
          label='Логин'
          icon={<bi.Person />}
          readonly
          value={props.creationResult.login}
        />

        <Input
          type='text'
          label='Пароль'
          icon={<bi.Key />}
          readonly
          value={props.creationResult.password}
        />
      </Flex>

      <Button onClick={props.onCloseClick}>Закрыть</Button>
    </Flex>
  );
}

export default StageSuccess;
