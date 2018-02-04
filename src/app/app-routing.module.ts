import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BucketListComponent } from './components/bucket-list/bucket-list.component';
import { BucketDetailsComponent } from './components/bucket-details/bucket-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'bucket-list' },
  { path: 'bucket-list', component: BucketListComponent },
  { path: 'bucket/:id', component: BucketDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [BucketListComponent, BucketDetailsComponent];