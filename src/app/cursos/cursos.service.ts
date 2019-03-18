import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, tap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Curso } from './curso';
import { pipe } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Curso[]>(this.API).pipe(
      delay(2000),
      tap(console.log),
    );
  }

  loadingByID(id) {
    return this.http.get(`${this.API}/${id}`).pipe(take(1));
  }

  create(curso) {
    return this.http.post(this.API, curso).pipe(take(1));
  }
}
