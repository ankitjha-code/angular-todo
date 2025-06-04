import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../services/task';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  standalone: true,
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  filterStatus = '';
  filterPriority = '';
  searchTerm = '';

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesStatus = this.filterStatus
        ? task.status === this.filterStatus
        : true;
      const matchesPriority = this.filterPriority
        ? task.priority === this.filterPriority
        : true;
      const matchesSearch = this.searchTerm
        ? task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      return matchesStatus && matchesPriority && matchesSearch;
    });
  }

  editTask(id: number) {
    this.router.navigate(['/task', id, 'edit']);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  addTask() {
    this.router.navigate(['/task/new']);
  }
}
