import { Component, OnInit } from '@angular/core';

interface Folder {
  ref: string;
  description: string;
  title: string;
  important: boolean;
}

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit {
  folders: Folder[] = [
    { ref: '001', description: 'Important documents', title: 'Documents', important: true },
    { ref: '002', description: 'Project files', title: 'Projects', important: false },
    { ref: '003', description: 'Personal photos', title: 'Photos', important: false },
    { ref: '004', description: 'Work presentations', title: 'Presentations', important: true },
    { ref: '005', description: 'Financial records', title: 'Finance', important: true },
    { ref: '006', description: 'Client information', title: 'Clients', important: true },
    { ref: '007', description: 'Research papers', title: 'Research', important: false },
    { ref: '008', description: 'Music collection', title: 'Music', important: false },
    { ref: '009', description: 'Travel itineraries', title: 'Travel', important: false },
    { ref: '010', description: 'Recipe collection', title: 'Recipes', important: false },
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
      const matchesSearch = folder.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            folder.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesImportant = this.showImportantOnly === null || folder.important === this.showImportantOnly;
      return matchesSearch && matchesImportant;
    });
    this.currentPage = 1;
  }
}