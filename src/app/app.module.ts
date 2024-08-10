import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import * as BootstrapIcons from '@ng-icons/bootstrap-icons';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MenubarModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [NgbActiveModal, { provide: BootstrapIcons.bootstrapBoxArrowInRight, useValue: BootstrapIcons.bootstrapBoxArrowInRight }],
  bootstrap: [AppComponent ]
})
export class AppModule { }
