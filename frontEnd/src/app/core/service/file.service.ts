import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = 'http://localhost:8081/api/file';  

  constructor(private http: HttpClient) {}

  createFile(file: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, file)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateFile(file: any, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, file)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  getFileById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`)
      .pipe(
        catchError(this.handleError)
      );

  }
  deleteFile(fileId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${fileId}`, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error.message || 'Server error');
  }
}
