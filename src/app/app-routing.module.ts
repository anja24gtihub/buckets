import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BucketListComponent } from './components/bucket-list/bucket-list.component';
import { BucketObjectsListComponent } from './components/bucket-objects-list/bucket-objects-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'bucket-list' },
  { path: 'bucket-list', component: BucketListComponent },
  { path: 'bucket-objects-list', component: BucketObjectsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [BucketListComponent, BucketObjectsListComponent];