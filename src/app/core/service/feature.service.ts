import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

    private apiUrl = 'http://localhost:8081/api/feature';  

  constructor(private http: HttpClient) { }

  getAllFeatures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

//   getFeatureById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/${id}`);
//   }

  createFeature(feature: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, feature);
  }

  updateFeature(id: number, feature: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, feature);
  }

  deleteFeature(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }
}
