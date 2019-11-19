import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModeloPessoa, NovaPessoa, responseupdatepessoa } from 'src/app/modelo-pessoa';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class WebapiService {

  private apiUrl = 'http://localhost:52432/api/Pessoas';

  constructor(private http: HttpClient) { }
  
getPessoa(id:string): Observable<ModeloPessoa>{
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<ModeloPessoa>(url)
}
getPessoas(): Observable<ModeloPessoa[]> {
  return this.http.get<ModeloPessoa[]>(this.apiUrl)
}
addPessoa(request: FormGroup): Observable<ModeloPessoa>{
  return this.http.post<ModeloPessoa>(this.apiUrl, request)
}
deletePessoa(id: string){
  const url = `${this.apiUrl}/${id}`;
  return this.http.delete(url)
}
updatePessoa(id: string, request: FormGroup): Observable<responseupdatepessoa>{
  const url = `${this.apiUrl}/${id}`;
  return this.http.put<responseupdatepessoa>(url, request)
}
}
