import { atomUser } from 'common/atoms';
import { accessCanRead, accessCanWrite } from 'common/helpers';
import { Flex, Page } from 'components';
import { useRecoilValue } from 'recoil';
import { CardNoAccess, PageUser, ScrollFiller } from 'shared/components';
import { CardTokens } from './components';

function PageTokens() {
  const accessLevel = useRecoilValue(atomUser)?.accessTokens ?? 'undefined';
  const canRead = accessCanRead(accessLevel);
  const canWrite = accessCanWrite(accessLevel);

  return (
    <Page title='Управление API-Токенами'>
      <PageUser>
        <Flex
          direction='column'
          gap={10}
        >
          {!canRead && <CardNoAccess />}
          {canRead && <CardTokens canWrite={canWrite} />}
          <ScrollFiller />
        </Flex>
      </PageUser>
    </Page>
  );
}

export default PageTokens;
