import {Component, EventEmitter, OnChanges, Output, Input, SimpleChanges} from '@angular/core';
import {Task} from '../task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Output() taskSaved = new EventEmitter<Task>();
  taskForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      completionDate: [''],
      status: ['TO_DO'],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      this.taskForm.patchValue({
        taskName: this.task.taskName,
        description: this.task.description,
        completionDate: this.task.completionDate,
        status: this.task.status,
      });

      Object.keys(this.taskForm.controls).forEach(control => {
        const controlField = this.taskForm.get(control);
        if (controlField) {
          controlField.setErrors(null);
          controlField.markAsPristine();
          controlField.markAsUntouched();
        }
      });
    } else {
      this.taskForm.reset();
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData: Task = {
        ...this.taskForm.value,
        id: this.task ? this.task.id : null
      };

      this.taskSaved.emit(taskData);
      this.resetForm();
    }
  }

  resetForm() {
    this.taskForm.reset({
      taskName: this.task?.taskName ?? '',
      description: this.task?.description ?? '',
      completionDate: this.task?.completionDate ?? null,
      status: this.task?.status ?? 'TO_DO',
    });

    Object.keys(this.taskForm.controls).forEach(control => {
      const controlField = this.taskForm.get(control);
      if (controlField) {
        controlField.setErrors(null);
        controlField.markAsPristine();
        controlField.markAsUntouched();
      }
    });
  }
}
