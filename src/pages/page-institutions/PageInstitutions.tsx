import { useRecoilValue } from 'recoil';
import { Flex, Page } from 'components';
import { atomUser } from 'common/atoms';
import { accessCanRead, accessCanWrite } from 'common/helpers';
import { CardNoAccess, PageUser, ScrollFiller } from 'shared/components';
import { CardInstitutions } from './components';

function PageInstitutions() {
  const accessLevel = useRecoilValue(atomUser)?.accessInstitutions ?? 'undefined';
  const canWrite = accessCanWrite(accessLevel);
  const canRead = accessCanRead(accessLevel);

  return (
    <Page title='Учебные заведения'>
      <PageUser>
        <Flex
          direction='column'
          gap={10}
        >
          {canRead && <CardInstitutions canWrite={canWrite} />}
          {!canRead && <CardNoAccess />}
          <ScrollFiller />
        </Flex>
      </PageUser>
    </Page>
  );
}

export default PageInstitutions;
