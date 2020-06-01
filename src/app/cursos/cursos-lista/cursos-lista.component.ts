import { Curso } from './../curso';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, empty, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[];
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  deleteModalRef: BsModalRef;
  cursoSelecionado: Curso;

  @ViewChild('deleteModal', { static: true }) deleteModal;

  constructor(
    private service: Cursos2Service,
    private modalService: BsModalService,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.onReflesh()
  }

  onReflesh() {
    this.cursos$ = this.service.list()
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

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route })
  }

  onDelete(curso) {
    this.cursoSelecionado = curso;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
    const result$ = this.alertModalService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso?')
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.service.delete(curso.id) : EMPTY)
      )
      .subscribe(
        success => {
          this.onReflesh()
        },
        error => {
          this.alertModalService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.')
        });
  }


  onDeclineDelete(): void {
    this.deleteModalRef.hide()
  }

}
