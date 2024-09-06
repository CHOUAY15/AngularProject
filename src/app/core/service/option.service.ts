import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OptionService {
private apiUrl = 'http://localhost:8081/api';
  constructor(private http: HttpClient) {}

  addCourt(court: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/court/create`, court); 
  }

  addJudge(judge: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/judge/create`, judge); 
  }
  addTopic(topic: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/topic/create`, topic); 
  }
  addAction(action: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/action-type/create`, action); 
  }

}
