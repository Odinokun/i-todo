import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

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
      <input
        type="text"
        className={ error ? 'error' : '' }
        value={ newItemTitle }
        placeholder="Write me..."
        onChange={ onChangeHandler }
        onKeyDown={ onKeyDownHandler }
      />
      <button onClick={ addItemHandler }>add</button>
      { error && <div className="error-message">{ error }</div> }
    </div>
  );
};