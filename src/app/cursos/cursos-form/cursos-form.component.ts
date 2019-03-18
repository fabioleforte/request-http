import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    // this.route.params
    //   .pipe(
    //     map((params: any) => {
    //       params['id'];
    //     }),
    //     switchMap(id => {
    //       return this.service.loadingByID(id);
    //     }),
    //   )
    //   .subscribe(curso => {
    //     this.updateForm(curso);
    //   });

    this.route.params.subscribe((params: any) => {
      const id = params.id;
      console.log(id);
      const curso$ = this.service.loadingByID(id);

      curso$.subscribe(curso => {
        this.updateForm(curso);
      });
    });

    this.form = this.fb.group({
      id: [''],
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  updateForm(curso) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome,
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSumit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      this.service.create(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess('Curso criado com sucesso!');
          this.location.back();
        },
        error => {
          this.modal.showAlertDanger('Erro ao criar curso, tente novamente!');
        },
        () => {
          console.log('request completo');
        },
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
