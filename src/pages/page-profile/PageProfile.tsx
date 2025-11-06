import { Flex, Page } from 'components';
import { PageUser, ScrollFiller } from 'shared/components';
import { CardProfile, CardSession, CardSessions } from './components';

function PageProfile() {
  return (
    <Page title='Профиль'>
      <PageUser>
        <Flex
          direction='column'
          gap={10}
        >
          <CardProfile />
          <CardSession />
          <CardSessions />
          <ScrollFiller />
        </Flex>
      </PageUser>
    </Page>
  );
}

export default PageProfile;
