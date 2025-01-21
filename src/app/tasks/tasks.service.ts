import { Injectable, signal } from '@angular/core';

import { type NewTaskData } from './task/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = signal([
    {
      id: 't1',
      title: 'Buy groceries',
      summary:
        'Purchase essentials like fruits, vegetables, milk, and bread for the week.',
      dueDate: '2025-01-30',
      completed: false,
    },
    {
      id: 't2',
      title: 'Clean the house',
      summary:
        'Clean the living room, kitchen, and bathroom. Organize the clutter and mop the floors.',
      dueDate: '2025-01-25',
      completed: false,
    },
    {
      id: 't3',
      title: 'Finish reading the book',
      summary:
        "Read the remaining chapters of the novel 'The Catcher in the Rye' to complete it.",
      dueDate: '2025-02-10',
      completed: false,
    },
  ]);

  allTasks = this.tasks.asReadonly();

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
  }

  addTask(taskData: NewTaskData) {
    this.tasks.update((prevTasks) => [
      {
        id: new Date().getTime().toString(),
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.date,
        completed: false,
      },
      ...prevTasks,
    ]);
    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks.update((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
    this.saveTasks();
  }

  editTask(id: string, updatedData: Partial<NewTaskData>) {
    this.tasks.update((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updatedData,
            }
          : task
      )
    );
    this.saveTasks();
  }

  getFilteredTasks(filter: string) {
    if (filter === 'completed') {
      return this.tasks().filter((task) => task.completed);
    } else if (filter === 'pending') {
      return this.tasks().filter((task) => !task.completed);
    }
    return this.tasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}
