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

  getAllCourts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/court/all`);
  }

  addJudge(judge: any): Observable<any> {
    const judgePayload = {
      fullName : judge.fullName,
      gender: judge.gender.description
    }
    return this.http.post(`${this.apiUrl}/judge/create`, judgePayload); 
  }
  getAllJudges(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/judge/all`);
  }

  addTopic(topic: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/topic/create`, topic); 
  }
  getAllTopics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/topic/all`);
  }
  addAction(action: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/action-type/create`, action); 
  }

  getAllActions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/action-type/all`);
  }

  getAllFeatures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/feature/all`);
  }

}
