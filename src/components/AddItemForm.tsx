import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

interface IProps {
  todolistId:string
  addItem: (title: string, todolistId: string) => void
}

export const AddItemForm: FC<IProps> = ({todolistId,addItem}) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value)

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && addTaskHandler()
    setError(null)
  }

  const addTaskHandler = () => {
    if (newTaskTitle.trim().length > 0) {
      addItem(newTaskTitle.trim(), todolistId);
      setNewTaskTitle('')
    } else {
      setError("WTF dude???")
    }
  }

  return (
    <div>
      <input
        type="text"
        className={error ? 'error' : ''}
        value={newTaskTitle}
        placeholder="Write me..."
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
      />
      <button onClick={addTaskHandler}>add</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}