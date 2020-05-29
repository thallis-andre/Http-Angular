import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { IfStmt } from '@angular/compiler';

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

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number) {
    const modalRef = this.modalService.show(AlertModalComponent);
    modalRef.content.type = type
    modalRef.content.message = message

    if (dismissTimeout) {
      setTimeout(() => modalRef.hide(), dismissTimeout)
    }
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER)
  }
  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 2000)
  }

  showConfirm(title: string, msg: string, cancelTxt?: string, okTxt?: string) {
    const modalRef = this.modalService.show(ConfirmModalComponent);
    modalRef.content.title = title
    modalRef.content.msg = msg

    if (okTxt) {
      modalRef.content.okTxt = okTxt
    }
    if (cancelTxt) {
      modalRef.content.cancelTxt = cancelTxt
    }

    return (<ConfirmModalComponent>modalRef.content).confirmResult;
  }
}
