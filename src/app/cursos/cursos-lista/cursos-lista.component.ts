import { Curso } from './../curso';
import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {
  
  // cursos: Curso[];
  cursos$: Observable<Curso[]>;

  constructor(
    private sevice: CursosService,
  ) { }

  ngOnInit() {
    // this.sevice.list().subscribe(
    //   dados => this.cursos = dados
    // )
    this.cursos$ = this.sevice.list()
  }

}
