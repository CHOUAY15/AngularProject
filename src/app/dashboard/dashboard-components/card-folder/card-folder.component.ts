import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Folder } from 'src/app/shared/models/folder';

@Component({
  selector: 'app-card-folder',
  templateUrl: './card-folder.component.html',
  styleUrl: './card-folder.component.scss'
})
export class CardFolderComponent {

  @Input() folder!:Folder;

  constructor(private route:ActivatedRoute){

  }
onUpdate() {
throw new Error('Method not implemented.');
}
onDelete() {
throw new Error('Method not implemented.');
}
onView() {
throw new Error('Method not implemented.');
}

}
