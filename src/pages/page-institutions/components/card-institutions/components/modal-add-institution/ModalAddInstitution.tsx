import { useState } from 'react';
import { Modal } from 'components/modal';
import { IAdminInstitutionPostFull } from 'common/models';
import { StageDefault, StageLoading, StageSuccess } from './components';
import { handleAuthOnly, handleErrorAsync } from 'common/handlers';
import { ApiInstitutions } from 'common/api';

type Stage = 'default' | 'loading' | 'success';

interface IProps {
  onClose: () => void;
}

function ModalAddInstitution(props: IProps) {
  const [stage, setStage] = useState<Stage>('default');
  const [result, setResult] = useState<IAdminInstitutionPostFull | null>(null);

  const handleCreateClick = async (data: { title: string; abbreviature: string }) =>
    await handleErrorAsync(
      async () =>
        await handleAuthOnly(async () => {
          setStage('loading');

          const result = await ApiInstitutions.getInstance().add({
            title: data.title,
            abbreviation: data.abbreviature,
          });
          setResult(result);

          setStage('success');
        })
    );

  const onClose = stage !== 'loading' ? props.onClose : undefined;

  return (
    <Modal
      size={400}
      onClose={onClose}
      header='Добавлние заведения'
    >
      {stage === 'default' && (
        <StageDefault
          onCloseClick={props.onClose}
          onCreateClick={handleCreateClick}
        />
      )}
      {stage === 'loading' && <StageLoading />}
      {stage === 'success' && result != null && (
        <StageSuccess
          onCloseClick={props.onClose}
          creationResult={result}
        />
      )}
    </Modal>
  );
}

export default ModalAddInstitution;
