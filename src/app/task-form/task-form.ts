import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../services/task';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
  standalone: true,
})
export class TaskForm implements OnInit {
  task: Task = {
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '', // Assuming categoryId is required, set a default value
  };

  isEditing = false;

  statuses = ['Pending', 'In Progress', 'Completed'];
  priorities = ['Low', 'Medium', 'High'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.taskService.getTaskById(+id).subscribe((task) => {
        this.task = task;
      });
    }
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.taskService.updateTask(this.task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    } else {
      this.taskService.createTask(this.task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}
