import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BucketListComponent } from './components/bucket-list/bucket-list.component';
import { BucketObjectsListComponent } from './components/bucket-objects-list/bucket-objects-list.component';


@NgModule({
  declarations: [
    AppComponent,
    BucketListComponent,
    BucketObjectsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
