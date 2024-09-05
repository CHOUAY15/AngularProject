import { Component, OnInit } from '@angular/core';
import { Folder } from 'src/app/shared/models/folder';


@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit {
  folders: Folder[] = [
    
   
  ];

  filteredFolders: Folder[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  searchTerm = '';
  showImportantOnly: boolean | null = null;
  showNotImportant = false;

  ngOnInit(): void {
    this.applyFilters();
  }

  get paginatedFolders(): Folder[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredFolders.slice(startIndex, startIndex + this.itemsPerPage);
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
    this.filteredFolders = this.folders.filter(folder => {
      const matchesSearch = folder.fileNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ;
      const matchesImportant = this.showImportantOnly === null || folder.feesCollected === this.showImportantOnly;
      return matchesSearch && matchesImportant;
    });
    this.currentPage = 1;
  }
}