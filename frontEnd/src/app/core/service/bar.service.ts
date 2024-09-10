import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarService {

    private apiUrl = 'http://localhost:8081/api/bar';  

  constructor(private http: HttpClient) { }

  getAllBars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

//   getBarById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/${id}`);
//   }

  createBar(Bar: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, Bar);
  }

  updateBar(id: number, Bar: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, Bar);
  }

  deleteBar(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }
}