import { useState } from 'react';
import * as bi from 'react-bootstrap-icons';
import { Button, Flex, Input } from 'components';

interface IProps {
  onCloseClick: () => void;
  onCreateClick: (data: { title: string; abbreviature: string }) => void;
}

function StageDefault(props: IProps) {
  const [abbreviature, setAbbreviature] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const handleAddClick = () => {
    props.onCreateClick({
      title: title.trim(),
      abbreviature: abbreviature.trim(),
    });
  };

  const isAbbreviatureValid = abbreviature.trim().length > 2;
  const isTitleValid = title.trim().length > 2;
  const isValid = isAbbreviatureValid && isTitleValid;

  return (
    <Flex
      direction='column'
      gap={20}
    >
      <Flex
        direction='column'
        gap={5}
      >
        <Input
          type='text'
          label='Аббревиатура'
          icon={<bi.AlphabetUppercase />}
          placeholder='СПбГЭТУ «ЛЭТИ»'
          value={abbreviature}
          onInput={setAbbreviature}
        />

        <Input
          type='text'
          label='Полное название'
          icon={<bi.AlphabetUppercase />}
          placeholder='Санкт-Петербургский государственный электротехнический университет «ЛЭТИ» имени В. И. Ульянова (Ленина)'
          value={title}
          onInput={setTitle}
        />
      </Flex>

      <Flex
        direction='column'
        gap={5}
      >
        <Button
          disabled={!isValid}
          onClick={handleAddClick}
        >
          Добавить
        </Button>
        <Button onClick={props.onCloseClick}>Отменить</Button>
      </Flex>
    </Flex>
  );
}

export default StageDefault;
