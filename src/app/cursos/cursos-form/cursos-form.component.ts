import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup
  submitted: boolean = false

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private alertModal: AlertModalService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id']
    //     const curso$ = this.service.loadById(id)
    //     curso$.subscribe(
    //       curso => this.updateForm(curso)
    //     )
    //   }

    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap(id => this.service.loadById(id))
    //   )
    //   .subscribe(curso => { this.updateForm(curso) })

    const curso = this.route.snapshot.data['curso']

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })
  }

  hasError(fild: string) {
    return this.form.get(fild).errors
  }

  onSubmit() {
    console.log(this.form.value)
    this.submitted = true
    if (this.form.valid) {

      let msgSuccess = 'Curso criado com sucesso';
      let msgError = 'Erro ao criar curso';

      if (this.form.value.id) {
        msgSuccess = 'Curso atualizado com sucesso';
        msgError = 'Erro ao atualizar curso';
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.alertModal.showAlertSuccess(msgSuccess),
            this.location.back()
        },
        error => this.alertModal.showAlertDanger(msgError),
      )
    }
  }
  onCancel() {
    this.submitted = false
    this.form.reset()
    this.router.navigate(['/'])
  }

  // updateForm(curso) {
  //   this.form.patchValue({
  //     nome: curso.nome,
  //     id: curso.id
  //   })
  // }


}
