import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { alunos } from './aluno';
@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  url = "http://localhost:3000/clients";

  constructor(private http : HttpClient) { }

  getAlunos(): Observable<alunos[]>{
    let url = "http://localhost:3000/clients";
    return this.http.get<alunos[]>(url);
  }

  save(Aluno : alunos): Observable<alunos>{
    return this.http.post<alunos>(this.url, Aluno);
  }

  remove(Aluno: alunos): Observable<void> {
    return this.http.delete<void>(`${this.url}/${Aluno.id}`);
  }

  update(Aluno: alunos): Observable<alunos> {
    return this.http.put<alunos>(`${this.url}/${Aluno.id}`,Aluno);
  }
 
}