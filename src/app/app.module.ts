import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BucketListComponent } from './components/bucket-list/bucket-list.component';
import { BucketObjectsListComponent } from './components/bucket-objects-list/bucket-objects-list.component';

import { StorageService } from './services/storage.service';

// Bootstrap modules
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
@NgModule({
  declarations: [
    AppComponent,
    BucketListComponent,
    BucketObjectsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [ StorageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
