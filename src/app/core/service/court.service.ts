import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourtService {

    private apiUrl = 'http://localhost:8081/api/court';  

  constructor(private http: HttpClient) { }

  getAllCourts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

//   getCourtById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/${id}`);
//   }

  createCourt(court: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, court);
  }

  updateCourt(id: number, court: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, court);
  }

  deleteCourt(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }
}
