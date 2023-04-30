import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { TextField } from '@material-ui/core';

interface IProps {
  title: string;
  onChange: (value: string) => void;
}

export const EditableSpan: FC<IProps> = ({title, onChange}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const activateEditMode = () => {
    setEditMode(true);
    setNewTitle(title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    onChange(newTitle.trim());
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && activateViewMode();
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value);


  return (
    <>
      {
        editMode ?
          <TextField
            value={ newTitle }
            onChange={ onChangeTitle }
            onBlur={ activateViewMode }
            onKeyDown={ onKeyDownHandler }
            variant="filled"
            autoFocus
          /> :
          <span onDoubleClick={ activateEditMode }>{ title }</span>
      }
    </>
  );
};