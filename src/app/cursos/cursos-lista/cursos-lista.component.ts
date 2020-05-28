import { Curso } from './../curso';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Observable, Subject, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  @ViewChild('deleteModal',{ static: true}) deleteModal;
  
  constructor(
    private service: CursosService,
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

  onEdit(id: number){
    this.router.navigate(['editar', id], { relativeTo: this.route})
  }

  onDelete(curso){
    this.cursoSelecionado = curso;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

 
  onConfirmDelete(): void {
    this.service.delete(this.cursoSelecionado.id).subscribe(
      success => {
        this.onReflesh(),
        this.deleteModalRef.hide()
      },
      error => {
        this.alertModalService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.'),
        this.deleteModalRef.hide()
      }
    )
  }
 
  onDeclineDelete(): void {
    this.deleteModalRef.hide()
  }

}
