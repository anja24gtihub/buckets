import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MessagesComponent } from './components/messages/messages.component';

import { BucketListComponent } from './components/bucket-list/bucket-list.component';
import { BucketObjectsListComponent } from './components/bucket-objects-list/bucket-objects-list.component';
import { BucketDetailsComponent } from './components/bucket-details/bucket-details.component';

import { StorageService } from './services/storage.service';
import { MessageService } from './services/message.service';

// Bootstrap modules
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    AppComponent,
    BucketListComponent,
    BucketObjectsListComponent,
    BucketDetailsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [StorageService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
