import { useState } from 'react';
import { v1 } from 'uuid';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

import { Todolist } from './components/Todolist';
import { AddItemForm } from './components/AddItemForm';

export interface ITasks {
  id: string;
  title: string;
  isDone: boolean;
}

export interface IFilterValues {
  all: string;
  active: string;
  completed: string;
}

export interface ITodolist {
  id: string;
  title: string;
  filter: keyof IFilterValues;
}

interface ITasksObj {
  [key: string]: ITasks[];
}

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<ITodolist[]>([
    { id: todolistId1, title: 'What to learn?', filter: 'active' },
    { id: todolistId2, title: 'What to buy?', filter: 'all' },
  ]);
  const [tasksObj, setTasksObj] = useState<ITasksObj>({
    [todolistId1]: [
      { id: v1(), title: 'HTML', isDone: true },
      { id: v1(), title: 'Css', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: true },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'GSAP', isDone: false },
      { id: v1(), title: 'Three.js', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Chicken', isDone: true },
      { id: v1(), title: 'Tomatoes', isDone: true },
      { id: v1(), title: 'Water', isDone: true },
      { id: v1(), title: 'Oranges', isDone: true },
      { id: v1(), title: 'Cheese', isDone: false },
    ],
  });

  const addTask = (todolistId: string, title: string) => {
    const newTask: ITasks = { id: v1(), title: title, isDone: false };
    setTasksObj({ ...tasksObj, [todolistId]: [newTask, ...tasksObj[todolistId]] });
  };

  const removeTask = (todolistId: string, id: string) => {
    tasksObj[todolistId] = tasksObj[todolistId].filter(t => t.id !== id);
    setTasksObj({ ...tasksObj });
  };

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(todo => todo.id !== todolistId));
    delete tasksObj[todolistId];
    setTasksObj({ ...tasksObj });
  };

  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    setTodolists(todolists.map(todo => (todo.id === todolistId ? { ...todo, title: newTitle } : todo)));
  };

  const changeStatus = (todolistId: string, taskId: string) => {
    tasksObj[todolistId] = tasksObj[todolistId].map(t => (t.id === taskId ? { ...t, isDone: !t.isDone } : t));
    setTasksObj({ ...tasksObj });
  };

  const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
    tasksObj[todolistId] = tasksObj[todolistId].map(t => (t.id === taskId ? { ...t, title: newTitle } : t));
    setTasksObj({ ...tasksObj });
  };

  const changeFilter = (todolistId: string, value: keyof IFilterValues) => {
    setTodolists(todolists.map(todo => (todo.id === todolistId ? { ...todo, filter: value } : todo)));
  };

  const addTodolist = (title: string) => {
    const newTodolist: ITodolist = { id: v1(), title, filter: 'all' };
    setTodolists([newTodolist, ...todolists]);
    setTasksObj({ [newTodolist.id]: [], ...tasksObj });
  };

  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit'>
            <Menu />
          </IconButton>
          <Typography variant='h6'>News</Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container style={{ padding: '20px 0' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>

        <Grid container spacing={3}>
          {todolists.map(todo => {
            let tasksForTodolist = tasksObj[todo.id];
            if (todo.filter === 'completed') {
              tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
            }
            if (todo.filter === 'active') {
              tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
            }

            return (
              <Grid item>
                <Paper style={{ padding: '20px' }}>
                  <Todolist
                    key={todo.id}
                    todolistId={todo.id}
                    title={todo.title}
                    tasks={tasksForTodolist}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeTaskStatus={changeStatus}
                    filter={todo.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
