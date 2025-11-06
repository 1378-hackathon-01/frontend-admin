import { Flex, Page } from 'components';
import { PageUser } from 'shared/components';
import { CardUser } from './components';

function PageMain() {
  return (
    <Page title='Главная страница'>
      <PageUser>
        <Flex
          direction='column'
          gap={10}
        >
          <CardUser />
        </Flex>
      </PageUser>
    </Page>
  );
}

export default PageMain;
