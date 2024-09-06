import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  private apiUrl = 'http://localhost:8081/api';  

  constructor(private http: HttpClient) {}

  addPartyToFile(party: any,idFile:number): Observable<any> {
    return this.http.post(`${this.apiUrl}/file/addParty/${idFile}`, party)
      .pipe(
        catchError(this.handleError)
      );
  }
  deletePartyFromFile(fileId: number,partyId:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/file/removeParty/${fileId}/${partyId}`, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateParty(id: number, party: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/party/update/${id}`, party);
  }
  getAllPartiesByFile(fileId:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/file/parties/${fileId}`);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error.message || 'Server error');
  }
}
