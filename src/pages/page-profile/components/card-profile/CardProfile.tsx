import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import * as bi from 'react-bootstrap-icons';
import { Box, Button, Flex, Header, Input } from 'components';
import { atomUser } from 'common/atoms';
import { isValidFullName, isValidPassword } from './helpers';
import { ModalSaved } from './components';
import { handleAuthOnly, handleEnterButton, handleErrorAsync } from 'common/handlers';
import { ApiUsers } from 'common/api';

function CardProfile() {
  const user = useRecoilValue(atomUser);

  if (user == null) {
    throw new Error('User must be loaded!');
  }

  const [savedModal, setSavedModal] = useState<boolean>(false);
  const [prevFullName, setPrevFullName] = useState<string>(user.fullName);
  const [fullName, setFullName] = useState<string>(user.fullName);
  const [newPassword, setNewPassword] = useState<string>('');

  const handleSaveFullNameClick = async () => {
    if (!isValidFullName(fullName)) {
      return;
    }

    await handleErrorAsync(async () => {
      await handleAuthOnly(async () => {
        setPrevFullName(fullName);
        await ApiUsers.getInstance().updateMe({ newFullName: fullName });
        setSavedModal(true);
      });
    });
  };

  const handleSavePasswordClick = async () => {
    if (!isValidPassword(newPassword)) {
      return;
    }

    await handleErrorAsync(async () => {
      await handleAuthOnly(async () => {
        const newPasswordCache = newPassword;

        setNewPassword('');
        await ApiUsers.getInstance().updateMe({ newPassword: newPasswordCache });
        setSavedModal(true);
      });
    });
  };

  return (
    <Box padding={20}>
      {savedModal && <ModalSaved onClose={() => setSavedModal(false)} />}
      <Flex
        direction='column'
        gap={20}
      >
        <Header>Параметры профиля</Header>

        <Flex direction='column'>
          <span>
            <b>ID профиля:</b> {user.id}
          </span>
          <span>
            <b>Логин профиля:</b> {user.login}
          </span>
        </Flex>

        <Flex direction='column'>
          <span>
            <b>Доступ к пользователям:</b> <i>{user.accessAdmins}</i>
          </span>
          <span>
            <b>Доступ к учебным заведениям:</b> <i>{user.accessInstitutions}</i>
          </span>
          <span>
            <b>Доступ к API-Токенам:</b> <i>{user.accessTokens}</i>
          </span>
        </Flex>

        <Flex
          direction='column'
          gap={10}
        >
          <Flex
            gap={5}
            alignItems='flex-end'
          >
            <Input
              type='text'
              icon={<bi.PersonFill />}
              value={fullName}
              onInput={setFullName}
              placeholder='Новое имя'
              onKeyUp={(e) => handleEnterButton(e, handleSaveFullNameClick)}
            />

            <Button
              disabled={fullName === prevFullName || !isValidFullName(fullName)}
              onClick={handleSaveFullNameClick}
            >
              <bi.FloppyFill />
            </Button>
          </Flex>

          <Flex
            gap={5}
            alignItems='flex-end'
          >
            <Input
              type='password'
              icon={<bi.Lock />}
              value={newPassword}
              onInput={setNewPassword}
              placeholder='Новый пароль'
              onKeyUp={(e) => handleEnterButton(e, handleSavePasswordClick)}
            />

            <Button
              disabled={!isValidPassword(newPassword)}
              onClick={handleSavePasswordClick}
            >
              <bi.FloppyFill />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CardProfile;
