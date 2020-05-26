import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { AlertModalService } from './alert-modal/alert-modal.service';



@NgModule({
  declarations: [
    AlertModalComponent]
    ,
  imports: [
    CommonModule
  ], 
  exports: [
    AlertModalComponent,
  ],
  entryComponents: [
    AlertModalComponent,
  ],
  providers: [
    AlertModalService,
  ]
})
export class SharedModule { }
