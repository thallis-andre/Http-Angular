import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { AlertModalService } from './alert-modal/alert-modal.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';



@NgModule({
  declarations: [
    AlertModalComponent,
    ConfirmModalComponent
  ]
    ,
  imports: [
    CommonModule
  ], 
  exports: [
    AlertModalComponent,
    ConfirmModalComponent,
  ],
  entryComponents: [
    AlertModalComponent,
    ConfirmModalComponent
  ],
  providers: [
    AlertModalService,
  ]
})
export class SharedModule { }
