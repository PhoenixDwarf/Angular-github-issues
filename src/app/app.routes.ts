import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'issues',
    loadComponent: () => import('./modules/issues/pages/issues-list/issues-list-page'),
  },
  {
    path: 'issue/:id',
    loadComponent: () => import('./modules/issues/pages/issue/issue-page'),
  },
  {
    path: '**',
    redirectTo: 'issues',
  },
];
