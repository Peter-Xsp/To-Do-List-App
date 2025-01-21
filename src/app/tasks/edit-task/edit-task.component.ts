import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent {
  editTitle = '';
  editSummary = '';
  editDate = '';
  taskId: string;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskId = this.route.snapshot.params['id'];
    this.loadTaskData();
  }

  loadTaskData() {
    const task = this.tasksService.allTasks().find((t) => t.id === this.taskId);
    if (task) {
      this.editTitle = task.title;
      this.editSummary = task.summary;
      this.editDate = task.dueDate;
    }
  }

  onEdit() {
    this.tasksService.editTask(this.taskId, {
      title: this.editTitle,
      summary: this.editSummary,
      date: this.editDate,
    });

    this.router.navigate(['']);
  }
}
