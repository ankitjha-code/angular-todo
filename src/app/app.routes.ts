import { Routes } from '@angular/router';
import { TaskList } from './task-list/task-list';
import { TaskForm } from './task-form/task-form';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskList },
  { path: 'task/new', component: TaskForm },
  { path: 'task/:id/edit', component: TaskForm },
];
