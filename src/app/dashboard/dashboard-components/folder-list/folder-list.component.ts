import { Component, OnInit } from '@angular/core';
import { Folder } from 'src/app/shared/models/folder';


@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit {
  folders: Folder[] = [
    new Folder(
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
      { id:1,authority: "محامي", fullName: "يوسف العلوي" }, // المحامي
      { title: "الجلسة الثانية" } // الوقت
    ),
    new Folder(
      "54321", // رقم الملف
      { city: "فاس" }, // المحكمة
      "قضية عقارية", // الموضوع
      { gender: "ذكر" }, // القاضي
      { description: "عقاري" }, // نوع الإجراء
      { fullName: "سلمان بن عبد الله", adresse: "حي الأطلس، فاس" }, // الأطراف
      "الحكم الأولي لم يصدر بعد", // الحكم الأولي
      3500, // الرسوم
      new Date("2024-12-20"), // تاريخ الخبرة
      {}, // مرجع الملكية
      false, // تقرير الخبير تم تقديمه
      true, // ورقة المصاريف تم تقديمها
      "1122334455", // رقم الحساب
      true, // الرسوم تم تحصيلها
      { id:2,authority: "محامي", fullName: "عبد الرحمن الكيحل" }, // المحامي
      { title: "الجلسة الأولى" } // الوقت
    ),
    new Folder(
      "67890", // رقم الملف
      { city: "مراكش" }, // المحكمة
      "قضية عمالية", // الموضوع
      { gender: "ذكر" }, // القاضي
      { description: "عمالي" }, // نوع الإجراء
      { fullName: "نور الدين حمدون", adresse: "حي جليز، مراكش" }, // الأطراف
      "الحكم الأولي تم", // الحكم الأولي
      1500, // الرسوم
      new Date("2024-10-10"), // تاريخ الخبرة
      {}, // مرجع الملكية
      true, // تقرير الخبير تم تقديمه
      true, // ورقة المصاريف تم تقديمها
      "2233445566", // رقم الحساب
      true, // الرسوم تم تحصيلها
      {id:3, authority: "محامي", fullName: "سعيد الزهراء" }, // المحامي
      { title: "الجلسة الرابعة" } // الوقت
    ),
    new Folder(
      "98765", // رقم الملف
      { city: "طنجة" }, // المحكمة
      "قضية تجارية", // الموضوع
      { gender: "أنثى" }, // القاضي
      { description: "تجاري" }, // نوع الإجراء
      { fullName: "سعاد الوردي", adresse: "حي البرنوصي، طنجة" }, // الأطراف
      "الحكم الأولي صدر", // الحكم الأولي
      2800, // الرسوم
      new Date("2024-09-05"), // تاريخ الخبرة
      {}, // مرجع الملكية
      true, // تقرير الخبير تم تقديمه
      false, // ورقة المصاريف تم تقديمها
      "3344556677", // رقم الحساب
      false, // الرسوم تم تحصيلها
      {id:4, authority: "محامي", fullName: "رشيد القادري" }, // المحامي
      { title: "الجلسة الثالثة" } // الوقت
    ),
    new Folder(
      "24680", // رقم الملف
      { city: "أكادير" }, // المحكمة
      "قضية عقارية", // الموضوع
      { gender: "ذكر" }, // القاضي
      { description: "عقاري" }, // نوع الإجراء
      { fullName: "يوسف ميراوي", adresse: "حي السلام، أكادير" }, // الأطراف
      "الحكم الأولي لم يصدر بعد", // الحكم الأولي
      3200, // الرسوم
      new Date("2024-11-30"), // تاريخ الخبرة
      {}, // مرجع الملكية
      false, // تقرير الخبير تم تقديمه
      true, // ورقة المصاريف تم تقديمها
      "5566778899", // رقم الحساب
      true, // الرسوم تم تحصيلها
      { id:4,authority: "محامي", fullName: "حسن العرابي" }, // المحامي
      { title: "الجلسة الثانية" } // الوقت
    ),
    new Folder(
      "13579", // رقم الملف
      { city: "الدار البيضاء" }, // المحكمة
      "قضية عمالية", // الموضوع
      { gender: "أنثى" }, // القاضي
      { description: "عمالي" }, // نوع الإجراء
      { fullName: "أسماء بن سودة", adresse: "حي مولاي يوسف، الدار البيضاء" }, // الأطراف
      "الحكم الأولي تم", // الحكم الأولي
      1700, // الرسوم
      new Date("2024-10-20"), // تاريخ الخبرة
      {}, // مرجع الملكية
      true, // تقرير الخبير تم تقديمه
      true, // ورقة المصاريف تم تقديمها
      "6677889900", // رقم الحساب
      true, // الرسوم تم تحصيلها
      {id:5, authority: "محامي", fullName: "فهد الجباري" }, // المحامي
      { title: "الجلسة الأولى" } // الوقت
    ),
    new Folder(
      "86420", // رقم الملف
      { city: "وجدة" }, // المحكمة
      "قضية تجارية", // الموضوع
      { gender: "ذكر" }, // القاضي
      { description: "مدني" }, // نوع الإجراء
      { fullName: "عبد الرحيم الطيب", adresse: "حي الربيع، وجدة" }, // الأطراف
      "الحكم الأولي صدر", // الحكم الأولي
      2500, // الرسوم
      new Date("2024-12-05"), // تاريخ الخبرة
      {}, // مرجع الملكية
      true, // تقرير الخبير تم تقديمه
      false, // ورقة المصاريف تم تقديمها
      "7788990011", // رقم الحساب
      false, // الرسوم تم تحصيلها
      {id:6, authority: "محامي", fullName: "كمال زكري" }, // المحامي
      { title: "الجلسة الرابعة" } // الوقت
    ),
    new Folder(
      "90817", // رقم الملف
      { city: "تطوان" }, // المحكمة
      "قضية عقارية", // الموضوع
      { gender: "أنثى" }, // القاضي
      { description: "عقاري" }, // نوع الإجراء
      { fullName: "سلمى العبدلي", adresse: "حي الصفا، تطوان" }, // الأطراف
      "الحكم الأولي لم يصدر بعد", // الحكم الأولي
      3000, // الرسوم
      new Date("2024-10-25"), // تاريخ الخبرة
      {}, // مرجع الملكية
      false, // تقرير الخبير تم تقديمه
      true, // ورقة المصاريف تم تقديمها
      "8899001122", // رقم الحساب
      true, // الرسوم تم تحصيلها
      { id:7,authority: "محامي", fullName: "أيمن الفاسي" }, // المحامي
      { title: "الجلسة الثانية" } // الوقت
    ),
    new Folder(
      "45678", // رقم الملف
      { city: "العيون" }, // المحكمة
      "قضية عمالية", // الموضوع
      { gender: "ذكر" }, // القاضي
      { description: "عمالي" }, // نوع الإجراء
      { fullName: "سعيد الدرهم", adresse: "حي المطار، العيون" }, // الأطراف
      "الحكم الأولي تم", // الحكم الأولي
      2200, // الرسوم
      new Date("2024-11-10"), // تاريخ الخبرة
      {}, // مرجع الملكية
      true, // تقرير الخبير تم تقديمه
      true, // ورقة المصاريف تم تقديمها
      "2233445566", // رقم الحساب
      true, // الرسوم تم تحصيلها
      {id:8, authority: "محامي", fullName: "محمد الشرايبي" }, // المحامي
      { title: "الجلسة الثالثة" } // الوقت
    )
   
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