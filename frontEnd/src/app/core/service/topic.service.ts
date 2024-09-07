import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

    private apiUrl = 'http://localhost:8081/api/topic';  

  constructor(private http: HttpClient) { }

  getAllTopics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

//   getTopicById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/${id}`);
//   }

  createTopic(topic: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, topic);
  }

  updateTopic(id: number, topic: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, topic);
  }

  deleteTopic(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }
}
