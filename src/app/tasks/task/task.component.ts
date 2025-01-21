import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Task } from './task.model';
import { TasksService } from '../tasks.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [DatePipe, RouterLink],
})
export class TaskComponent {
  task = input.required<Task>();
  private tasksService = inject(TasksService);

  onComplete() {
    const updatedTask = { ...this.task(), completed: !this.task().completed };
    this.tasksService.editTask(this.task().id, updatedTask);
  }

  onDelete() {
    this.tasksService.removeTask(this.task().id);
  }
}
