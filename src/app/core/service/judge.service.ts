import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JudgeService {

    private apiUrl = 'http://localhost:8081/api/judge';  

  constructor(private http: HttpClient) { }

  getAllJudges(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

//   getJudgeById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/${id}`);
//   }

  createJudge(judge: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, judge);
  }

  updateJudge(id: number, judge: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, judge);
  }

  deleteJudge(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }
}
