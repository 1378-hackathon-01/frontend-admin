import { IAdminInstitutionBrief } from 'common/models';
import { Modal } from 'components/modal';
import { useState } from 'react';
import { StageDefault, StageLoading, StageSuccess } from './components';
import { handleAuthOnly, handleErrorAsync } from 'common/handlers';
import { ApiInstitutions } from 'common/api';

type Stage = 'default' | 'loading' | 'success';

interface IProps {
  institution: IAdminInstitutionBrief;
  onClose: () => void;
}

function ModalDeleteInstitution(props: IProps) {
  const [stage, setStage] = useState<Stage>('default');

  const handleDeleteClick = async () =>
    await handleErrorAsync(
      async () =>
        await handleAuthOnly(async () => {
          setStage('loading');

          await ApiInstitutions.getInstance().delete(props.institution.id);

          setStage('success');
        })
    );

  return (
    <Modal
      size={400}
      onClose={stage !== 'loading' ? props.onClose : undefined}
      header='Удаление учебного заведения'
    >
      {stage === 'default' && (
        <StageDefault
          onDeclineClick={props.onClose}
          onAcceptClick={handleDeleteClick}
        />
      )}
      {stage === 'loading' && <StageLoading />}
      {stage === 'success' && <StageSuccess onCloseClick={props.onClose} />}
    </Modal>
  );
}

export default ModalDeleteInstitution;
