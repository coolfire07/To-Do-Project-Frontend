import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor(private readonly taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks({}).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onEditTask(taskId: number) {
    const taskToEdit = this.tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      this.selectedTask = taskToEdit;
    }
  }

  onDeleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }
}
