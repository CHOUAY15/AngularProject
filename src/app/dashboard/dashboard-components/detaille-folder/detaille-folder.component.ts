import { Component, OnInit } from '@angular/core';
import { Folder } from 'src/app/shared/models/folder';

@Component({
  selector: 'app-detaille-folder',
  templateUrl: './detaille-folder.component.html',
  styleUrl: './detaille-folder.component.scss'
})
export class DetailleFolderComponent  implements OnInit{


  folder!: Folder;

  ngOnInit(): void {
    this.folder = new Folder(
      "12123", // رقم الملف
      { city: "الرباط" }, // المحكمة
      "قضية تجارية", // الموضوع
      { gender: "أنثى" }, // القاضي
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
      { title: "الجلسة الثانية" } // الوقت
    );
  }

 
}


