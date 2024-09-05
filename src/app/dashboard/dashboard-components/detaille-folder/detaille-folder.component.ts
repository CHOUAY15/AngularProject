import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Folder } from 'src/app/shared/models/folder';
import { DeleteConfirmationDialogComponent } from '../card-folder/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { InvitOptionDialogComponent } from './invit-option-dialog/invit-option-dialog.component';

@Component({
  selector: 'app-detaille-folder',
  templateUrl: './detaille-folder.component.html',
  styleUrl: './detaille-folder.component.scss'
})
export class DetailleFolderComponent  implements OnInit{



  folder!: Folder;

  constructor(private route:Router, private dialog: MatDialog){

  }

  ngOnInit(): void {
    this.folder = new Folder(
      "12123", // رقم الملف
      { city: "الرباط",name:"" }, // المحكمة
     // الموضوع
      { gender: "أنثى",fullName:"" }, // القاضي
      { description: "مدني" }, // نوع الإجراء
      { fullName: "فاطمة الزهراء بن سعيد", adresse: "حي التقدم، الرباط" }, // الأطراف
      "الحكم الأولي صدر", // الحكم الأولي
      2000, // الرسوم
      new Date("2024-11-15"), // تاريخ الخبرة
      {}, // مرجع الملكية
      true, // تقرير الخبير تم تقديمه
      false, // ورقة المصاريف تم تقديمها
      "0987654321", // رقم الحساب
      false, // الرسوم تم تحصيلها
      {id:1, authority: "محامي", fullName: "يوسف العلوي" }, // المحامي
      { title: "الجلسة الثانية" },
      { description: "قضية تجارية" }, // الوقت
    );
  }

  showParties() {
    this.route.navigateByUrl(`parties/${this.folder.fileNumber}/allalalal`)
    }
    showLawyers() {
   this.route.navigateByUrl(`lawyers/${this.folder.fileNumber}/allalalal`)
    }
    generateInvitation() {
      const dialogRef = this.dialog.open(InvitOptionDialogComponent, {
        width: '300px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'optionOne') {
          console.log('Option One selected');
          // Handle option one selection
        } else if (result === 'optionTwo') {
          console.log('Option Two selected');
          // Handle option two selection
        }
      });
    }
    onUpdate() {
    throw new Error('Method not implemented.');
    }
    onDelete() {
      const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
        width: '350px',
        data: { folderNumber: this.folder.fileNumber }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // User confirmed deletion
          console.log('Deleting folder:', this.folder.fileNumber);
          // Implement your delete logic here
        }
      });
    }

 
}


