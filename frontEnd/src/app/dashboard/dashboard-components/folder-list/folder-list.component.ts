import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/core/service/file.service';
import { FolderRefreshService } from 'src/app/core/service/folder-refresh.service';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss'],
})
export class FolderListComponent implements OnInit {
  folders: any[] = [];

  filteredFolders: any[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  searchTerm = '';
  showImportantOnly: boolean | null = null;
  showNotImportant = false;

  constructor(
    private fileService: FileService,
    private folderRefreshService: FolderRefreshService
  ) {}

  ngOnInit(): void {
    this.loadFolders();
    this.applyFilters();
    this.folderRefreshService.refreshFolders$.subscribe(() => {
      this.loadFolders();
    });
  }
  loadFolders() {
    this.fileService.findAll().subscribe(
      (data: any[]) => {
        console.log('nawaal', data);
        this.folders = data;
        this.applyFilters();
      },
      (error) => {
        console.error('Error loading folders:', error);
      }
    );
  }

  get paginatedFolders(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredFolders.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredFolders.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  applyFilters(): void {
    this.filteredFolders = this.folders.filter((folder) => {
      const matchesSearch =
        folder.fileNumber
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        folder.court.name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        folder.judge.fullName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        folder.topic.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        folder.actionType.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        folder.judgment
          ?.toString()
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      const matchesImportant =
        this.showImportantOnly === null ||
        folder.feeCollection === this.showImportantOnly;
      return matchesSearch && matchesImportant;
    });
    this.currentPage = 1;
  }
}
