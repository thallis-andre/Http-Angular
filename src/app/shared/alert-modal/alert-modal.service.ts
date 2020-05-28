import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal.component';

enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(
    private modalService: BsModalService,
  ) { }

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number){
    const modalRef = this.modalService.show(AlertModalComponent);
    modalRef.content.type = type
    modalRef.content.message = message

    if(dismissTimeout){
      setTimeout(() => modalRef.hide(), dismissTimeout)
    }
  }

  showAlertDanger(message: string){
    this.showAlert(message, AlertTypes.DANGER)
  }
  showAlertSuccess(message: string){
    this.showAlert(message, AlertTypes.SUCCESS, 2000)
  }
}