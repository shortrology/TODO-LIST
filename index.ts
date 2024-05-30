#! /usr/bin/env node

import inquirer from 'inquirer';

// Todo interface
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Todo list array
let todos: Todo[] = [];
let nextId: number = 1;

// Main function to run the todo list app
async function runTodoApp() {
  while (true) {
    const { choice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['Add Todo', 'Update Todo', 'Delete Todo', 'View Todos', 'Exit'],
      },
    ]);

    switch (choice) {
      case 'Add Todo':
        await addTodo();
        break;
      case 'Update Todo':
        await updateTodo();
        break;
      case 'Delete Todo':
        await deleteTodo();
        break;
      case 'View Todos':
        viewTodos();
        break;
      case 'Exit':
        console.log('Goodbye!');
        return;
    }
  }
}

// Function to add a new todo
async function addTodo(): Promise<void> {
  const { text } = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter the todo text:',
    },
  ]);

  const newTodo: Todo = {
    id: nextId++,
    text,
    completed: false,
  };
  todos.push(newTodo);
  console.log(`Added "${text}" to the todo list.`);
}

// Function to view all todos
function viewTodos(): void {
  if (todos.length === 0) {
    console.log('The todo list is empty.');
  } else {
    console.log('Todo List:');
    todos.forEach((todo) => {
      console.log(`${todo.id}. ${todo.text} (${todo.completed ? 'Completed' : 'Incomplete'})`);
    });
  }
}

// Function to update a todo
async function updateTodo(): Promise<void> {
  const { id } = await inquirer.prompt([
    {
      type: 'number',
      name: 'id',
      message: 'Enter the id of the todo to update:',
    },
  ]);

  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    const { updatedText } = await inquirer.prompt([
      {
        type: 'input',
        name: 'updatedText',
        message: 'Enter the updated todo text:',
      },
    ]);
    todo.text = updatedText;
    console.log(`Updated todo with id ${id} to "${updatedText}".`);
  } else {
    console.log(`Todo with id ${id} not found.`);
  }
}

// Function to delete a todo
async function deleteTodo(): Promise<void> {
  const { id } = await inquirer.prompt([
    {
      type: 'number',
      name: 'id',
      message: 'Enter the id of the todo to delete:',
    },
  ]);

  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1)[0];
    console.log(`Deleted todo with id ${deletedTodo.id}: "${deletedTodo.text}".`);
  } else {
    console.log(`Todo with id ${id} not found.`);
  }
}

// Run the todo app
runTodoApp();




