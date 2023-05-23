import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { clients } from './client';
@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  url = "http://localhost:3000/clients";

  constructor(private http : HttpClient) { }

  getClients(): Observable<clients[]>{
    let url = "http://localhost:3000/clients";
    return this.http.get<clients[]>(url);
  }

  save(client : clients): Observable<clients>{
    return this.http.post<clients>(this.url, client);
  }

  remove(client: clients): Observable<void> {
    return this.http.delete<void>(`${this.url}/${client.id}`);
  }

  update(client: clients): Observable<clients> {
    return this.http.put<clients>(`${this.url}/${client.id}`,client);
  }
 
}