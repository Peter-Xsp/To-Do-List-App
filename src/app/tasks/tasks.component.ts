import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  private tasksService = inject(TasksService);
  filter: string = 'all';

  setFilter(filter: string) {
    this.filter = filter;
  }

  filteredTasks() {
    return this.tasksService.getFilteredTasks(this.filter);
  }
}
