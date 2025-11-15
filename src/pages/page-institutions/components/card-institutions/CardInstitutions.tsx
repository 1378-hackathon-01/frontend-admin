import { useEffect, useState } from 'react';
import { IAdminInstitutionBrief } from 'common/models';
import { Box, Button, Flex, Header, Loader, Message } from 'components';
import { handleAuthOnly, handleErrorAsync } from 'common/handlers';
import { ApiInstitutions } from 'common/api';
import { CardInstitution, ModalAddInstitution, ModalDeleteInstitution } from './components';

interface IProps {
  canWrite: boolean;
}

function CardInstitutions(props: IProps) {
  const [institutions, setInstitutions] = useState<IAdminInstitutionBrief[] | null>(null);
  const [modalAddInstitution, setModalAddInstitution] = useState<boolean>(false);
  const [modalDeleteInstitution, setModalDeleteInstitution] = useState<IAdminInstitutionBrief | null>(null);

  useEffect(() => {
    loadInstitutions();
  }, []);

  const loadInstitutions = async () =>
    await handleErrorAsync(
      async () =>
        await handleAuthOnly(async () => {
          const institutions = await ApiInstitutions.getInstance().getAll();
          setInstitutions(institutions);
        })
    );

  const handleModalClose = () => {
    setModalDeleteInstitution(null);
    setModalAddInstitution(false);
    setInstitutions(null);

    loadInstitutions();
  };

  return (
    <Box padding={20}>
      {modalDeleteInstitution && (
        <ModalDeleteInstitution
          institution={modalDeleteInstitution}
          onClose={handleModalClose}
        />
      )}
      {modalAddInstitution && <ModalAddInstitution onClose={handleModalClose} />}

      <Flex
        direction='column'
        gap={20}
      >
        <Header>Список учебных заведений</Header>

        {institutions == null && (
          <Flex
            direction='column'
            justifyContent='center'
            alignItems='center'
          >
            <Loader
              variant='line'
              color='01'
              size='default'
            />
          </Flex>
        )}

        {institutions != null && (
          <Flex
            direction='column'
            gap={20}
          >
            {props.canWrite && (
              <Flex justifyContent='flex-end'>
                <Button onClick={() => setModalAddInstitution(true)}>Добавить Учебное Заведение</Button>
              </Flex>
            )}

            <Message
              type='info'
              title='Подсказка'
            >
              <p>На платформе реализовано разделение уровней доступа управления ресурсами.</p>
              <p>
                На уровне администратора вам доступно только базовое создание или удаление учебных заведений (при
                условии, что у вашего пользователя есть право записи данных).
              </p>
              <p>
                Более глубокое управления учебными заведениями осуществляется в отдельном{' '}
                <a href='https://cp.studgram.ru'>веб-приложении администратора учебного заведения.</a>
              </p>
            </Message>

            <Flex
              direction='column'
              gap={5}
            >
              {institutions.length === 0 && (
                <Message
                  type='warning'
                  title='Здесь пусто!'
                >
                  <p>В базе данных не найдено ни одного учебного заведения!</p>
                  <p>Добавьте хотя бы одно с помощью кнопки выше, чтобы начать использовать функционал сервиса.</p>
                </Message>
              )}

              {institutions.map((x) => (
                <CardInstitution
                  key={x.id}
                  institution={x}
                  canWrite={props.canWrite}
                  onDeleteClick={() => setModalDeleteInstitution(x)}
                />
              ))}
            </Flex>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default CardInstitutions;
