import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LawyerService {

  private apiUrl = 'http://localhost:8081/api';  

  constructor(private http: HttpClient) {}

  addLawyerToFile(lawyer: any,idFile:number): Observable<any> {
    return this.http.post(`${this.apiUrl}/file/addLawyer/${idFile}`, lawyer)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteLawyerFromFile(fileId: number,lawyerId:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/file/removeLawyer/${fileId}/${lawyerId}`, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateLawyer(id: number, lawyer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/lawyer/update/${id}`, lawyer);
  }
  getAllLawyersByFile(fileId:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/file/lawyers/${fileId}`);
  }
  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error.message || 'Server error');
  }
}
