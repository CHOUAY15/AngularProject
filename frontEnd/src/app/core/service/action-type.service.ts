import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionTypeService {

    private apiUrl = 'http://localhost:8081/api/action-type';  

  constructor(private http: HttpClient) { }

  getAllActionTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

//   getActionTypeById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/${id}`);
//   }

  createActionType(actionType: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, actionType);
  }

  updateActionType(id: number, actionType: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, actionType);
  }

  deleteActionType(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });

  }
}
