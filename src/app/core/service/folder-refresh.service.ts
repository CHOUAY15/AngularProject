import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderRefreshService {
  private refreshFoldersSubject = new Subject<void>();

  refreshFolders$ = this.refreshFoldersSubject.asObservable();

  triggerRefresh() {
    this.refreshFoldersSubject.next();
  }
}
