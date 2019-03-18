import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Curso } from './../curso';
import { CursosService } from './../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {
  // cursos: Curso[];
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  // bsModalRef: BsModalRef;

  constructor(
    private service: CursosService,
    // private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      }),
    );

    // this.service.list()
    //   .pipe(
    //     catchError(error => empty())
    //   )
    //   .subscribe(dados => {
    //     console.log(dados);
    //   });
  }

  handleError() {
    this.alertService.showAlertDanger(
      'Erro ao carregar cursos. Tente novamente mais tarde.',
    );
  }

  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }
}
