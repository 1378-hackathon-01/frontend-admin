import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { atomUser } from 'common/atoms';
import { handleAuthOnly, handleErrorAsync } from 'common/handlers';
import { ApiUsers } from 'common/api';
import { Flex } from 'components';
import { ModalLoader, Navbar } from './components';
import './style.scss';

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
}

function PageUser(props: IProps) {
  const [user, setUser] = useRecoilState(atomUser);

  useEffect(() => {
    if (user == null) {
      loadUser();
    }
  }, []);

  const loadUser = () =>
    handleErrorAsync(async () => {
      await handleAuthOnly(async () => {
        const user = await ApiUsers.getInstance().getMe();
        setUser(user);
      });
    });

  if (user == null) {
    return <ModalLoader />;
  }

  return (
    <Flex
      className='page-user-7p8y'
      direction='column'
      gap={10}
    >
      <Navbar />
      <div>{props.children}</div>
    </Flex>
  );
}

export default PageUser;
