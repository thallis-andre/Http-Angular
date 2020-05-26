import { Curso } from './../curso';
import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Observable, Subject, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[];
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  modalRef: BsModalRef;
  
  constructor(
    private sevice: CursosService,
    private alertModalService: AlertModalService,
  ) { }

  ngOnInit() {
    this.onReflesh()
  }

  onReflesh() {
    this.cursos$ = this.sevice.list()
      .pipe(
        catchError(error => {
          console.log(error)
          // this.error$.next(true)
          this.handleError()
          return empty()
        })
      )
  }

  handleError() {
    this.alertModalService.showAlertDanger('Erro ao buscar cursos. Tente novamente mais tarde.')
  }

}
