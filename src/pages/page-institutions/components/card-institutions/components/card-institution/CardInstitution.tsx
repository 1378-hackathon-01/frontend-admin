import { IAdminInstitutionBrief } from 'common/models';
import { Button, Flex } from 'components';
import './style.scss';

interface IProps {
  institution: IAdminInstitutionBrief;
  canWrite: boolean;
  onDeleteClick: () => void;
}

function CardInstitution(props: IProps) {
  return (
    <Flex
      className='institution-card-0jjl'
      direction='column'
      gap={5}
    >
      <div>
        <b>{props.institution.abbreviation}</b> — {props.institution.title}
      </div>

      {props.canWrite && (
        <Flex justifyContent='flex-end'>
          <Button onClick={props.onDeleteClick}>Удалить</Button>
        </Flex>
      )}
    </Flex>
  );
}

export default CardInstitution;
