import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';

interface IProps {
  addItem: (title: string) => void;
}

export const AddItemForm: FC<IProps> = ({addItem}) => {
  const [newItemTitle, setNewItemTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewItemTitle(e.target.value);

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && addItemHandler();
    setError(null);
  };

  const addItemHandler = () => {
    if (newItemTitle.trim().length > 0) {
      addItem(newItemTitle.trim());
      setNewItemTitle('');
    } else {
      setError("WTF dude???");
    }
  };

  return (
    <div>
      <TextField
        error={ !!error }
        helperText={ error }
        value={ newItemTitle }
        onChange={ onChangeHandler }
        onKeyDown={ onKeyDownHandler }
        label="Write me..."
        variant="outlined"
        size="small"
      />
      <IconButton
        onClick={ addItemHandler }
        color="primary"
      >
        <AddCircleOutline/>
      </IconButton>
    </div>
  );
};