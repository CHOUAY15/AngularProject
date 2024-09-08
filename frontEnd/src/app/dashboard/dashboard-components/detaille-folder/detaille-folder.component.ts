import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmationDialogComponent } from '../card-folder/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { InvitOptionDialogComponent } from './invit-option-dialog/invit-option-dialog.component';
import { FileService } from 'src/app/core/service/file.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { UpdateFolderComponent } from '../update-folder/update-folder.component';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-detaille-folder',
  templateUrl: './detaille-folder.component.html',
  styleUrls: ['./detaille-folder.component.scss'],
})
export class DetailleFolderComponent implements OnInit {
  folder!: any;
  folderID: any;

  constructor(
    private route: Router,
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.folderID = params.get('id');
      this.getFolderDetails(this.folderID);
    });
  }

  getFolderDetails(id: number): void {
    this.fileService.getFileById(id).subscribe(
      (data) => {
        this.folder = data;
      },
      (error) => {
        console.error('Error fetching folder details:', error);
      }
    );
  }

  showParties() {
    this.route.navigateByUrl(
      `parties/${this.folder.fileNumber}/${this.folder.id}`
    );
  }

  showLawyers() {
    this.route.navigateByUrl(
      `lawyers/${this.folder.fileNumber}/${this.folder.id}`
    );
  }

  generateInvitation() {
    const dialogRef = this.dialog.open(InvitOptionDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'optionOne') {
        console.log('Option One selected');
        console.log('hhahahhahahha', this.folder);
        if (
          this.folder.lawyers.length === 0 ||
          this.folder.parties.length < 2
        ) {
          this.dialog.open(SuccessDialogComponent, {
            width: '350px',
            data: {
              title: 'تنبيه  ',
              message: `لا يمكنك توليد هذا المستند لأنه يجب أن يكون هناك على الأقل محامٍ واحد وأكثر من طرفين`
            }
          });
        } else {
          this.folder.parties.forEach((party: any) => {
            this.generatePDF(party, this.folder, 2);
          });
        }

        // Handle option one selection
      } else if (result === 'optionTwo') {
        console.log('hhahahhahahha', this.folder);
        if (
          this.folder.lawyers.length === 0 ||
          this.folder.parties.length < 2
        ) {
          this.dialog.open(SuccessDialogComponent, {
            width: '350px',
            data: {
              title: 'تنبيه  ',
              message: `لا يمكنك توليد هذا المستند لأنه يجب أن يكون هناك على الأقل محامٍ واحد وأكثر من طرفين`
            }
          });
        } else {
          this.folder.lawyers.forEach((lawyer: any) => {
            this.generatePDF(lawyer, this.folder, 1);
          });
        }
      }
    });
  }
  generatePDF(lawyer: any, folder: any, nmb: number) {
  
    const groupByFeatureDescription: { [key: string]: any[] } = folder.parties.reduce((groups: { [key: string]: any[] }, party: any) => {
      const featureDesc = party.feature.description;

      if (!groups[featureDesc]) {
        groups[featureDesc] = [];
      }
      groups[featureDesc].push(party);
      console.log('khdmiiiii',groups);
      return groups;
    }, {});
  
    let partiesContent = '';
    for (const [description, parties] of Object.entries(groupByFeatureDescription)) {
      const partyList = parties as any[]; 
  
      if (partyList.length > 1) {
        const firstParty = partyList[0];
        partiesContent += `
          <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;">
            <span dir="rtl"><strong><em>بين السيد(ة) ${firstParty.fullName} (${description} من جهة) ومن معه</em></strong></span>
          </p>`;
      } else {
        const singleParty = partyList[0];
        partiesContent += `
          <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;">
            <span dir="rtl"><strong><em>بين السيد(ة) ${singleParty.fullName} (${description} من جهة)</em></strong></span>
          </p>`;
      }
    }


    const content1 = `
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Legal Document</title>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">    
</head>
<body style="padding-left:800px; padding-right:800px;" >
 

    <div>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><strong><em>&nbsp;</em></strong></p>
        <div class="styled-boxTwo">
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><em><u><span style="font-weight:bold;" dir="rtl">خليد الزوبيحي</span></u></em></p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><em><u><span style="font-weight:bold;" dir="rtl">مهندس مساح طبوغرافي&nbsp;</span></u></em></p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><em><u><span style="font-weight:bold;" dir="rtl">الجاعل محل المخابرة معه بزنقة أناطول فرانس، إقامة سلمى ب، الشقة 3 الجديدة</span></u></em></p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><strong><em><u>06-62-06-42-16</u></em></strong></p>

        </div>
        
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:20pt;"><strong><span style="color:#0000ff;">&nbsp;</span></strong></p>
        <p  class="styled-box" style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:20pt;"><span dir="rtl"><strong><em><u>&nbsp;</u></em></strong><strong><em><u>بســــم اللـــه الرحمــــان الرحيـــم</u></em></strong></span></p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:20pt;"><strong><em>&nbsp;</em></strong></p>
        <div style="text-align:center;">
            <table cellspacing="0" cellpadding="0" style="margin-right:auto; margin-left:auto; border:1.5pt double #000000; border-collapse:collapse;">
                <tbody>
                    <tr>
                    
                        <td style="width:293.2pt; border-right-style:double; border-right-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle;">
                            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">${folder.fileNumber}</p>
                            ${partiesContent}
                        </td>
                            <td style="width:139.5pt; border-left-style:double; border-left-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle; background-color:#f2f2f2;">
                            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">ملف عدد</span></em></p>
                        </td>
                     
                    </tr>
                    <tr>
                          <td style="width:293.2pt; border-top-style:double; border-top-width:1.5pt; border-right-style:double; border-right-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle;">
                            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">----</p>
                        </td>
                        <td style="width:139.5pt; border-top-style:double; border-top-width:1.5pt; border-left-style:double; border-left-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle; background-color:#f2f2f2;">
                            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">حكم تمهيدي صادر بتاريخ</span></em></p>
                        </td>
                  
                      
                    </tr>
                    <tr>
                   
                        <td style="width:293.2pt; border-top-style:double; border-top-width:1.5pt; border-right-style:double; border-right-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle;">
                            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">${folder.experienceDate}</p>
                        </td>
                             <td style="width:139.5pt; border-top-style:double; border-top-width:1.5pt; border-left-style:double; border-left-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle; background-color:#f2f2f2;">
                            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">تاريخ إجراء الخبرة</span></em></p>
                        </td>
                    
                    </tr>
                    <tr>
                    
                        <td style="width:293.2pt; border-top-style:double; border-top-width:1.5pt; border-right-style:double; border-right-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle;">
                            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl"> ${folder.hour}</span></em></p>
                        </td>
                            <td style="width:139.5pt; border-top-style:double; border-top-width:1.5pt; border-left-style:double; border-left-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle; background-color:#f2f2f2;">
                            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">على الساعة</span></em></p>
                        </td>
                     
                    </tr>
                </tbody>
            </table>
        </div>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10pt;"><strong><em>&nbsp;</em></strong></p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:14pt;"><em><u><span style="font-weight:bold;" dir="rtl">إلى السيد (ة)</span></u></em></p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><em><span style="font-weight:bold;" dir="rtl">الأستاذ(ة)   ${lawyer.fullName}</span></em></p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><em><span style="font-weight:bold;" dir="rtl">محامي بهيئة  ${lawyer.authority}</span></em></p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><strong><em>&nbsp;</em></strong></p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><em><u><span style="font-weight:bold;" dir="rtl">استدعاء قانوني لحضور إجراءات خبرة.</span></u></em> : الموضوع</p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; font-size:16pt;"><strong><em>&nbsp;</em></strong></p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">&nbsp;</span></em></p>
        <p style="margin-top:0pt; margin-right:21.15pt; margin-bottom:0pt; text-align:right; line-height:150%; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">سيدي (تي)</span></em></p>
        <p style="margin-top:0pt; margin-right:21.15pt; margin-bottom:0pt; text-align:right; line-height:150%; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">تحية طيبة,</span></em></p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"><span dir="rtl"><strong><em>بأمر من المحكمة الابتدائية بالجديدة وبنا ء ا على الحكم لتمهيدي آلذي بمقتضاه عينت خبيرا للقيام بالمهمة المطلوبة المرجو منكم الحضور إلى&nbsp;</em></strong><strong><em><u>عين مكان العقار</u></em></strong><strong><em>&nbsp;حاملين بطاقتكم الوطنية قصد القيام بالمهمة المسندة إلي من طرف المحكمة الموقرة و ذلك في اليوم و الساعة المحددين ٱعلاه.</em></strong></span></p>
        <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">والسلام</span></em></p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10pt;"><span style="font-weight:bold; color:#0000ff;" dir="rtl">&nbsp;</span></p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">وبه وجب إخباركم.</span></em></p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><u><span style="font-weight:bold;" dir="rtl">إمضاء</span></u></em></p>
        <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">خليد الزوبيحي</span></em></p>
        <p style="margin-top:0pt; margin-bottom:0pt; font-size:10pt;"><strong><span style="color:#0000ff;">&nbsp;</span></strong></p>
    </div>
</body>
<style>
    .styled-box {
      
      border: 4px solid black; /* Solid black border */
      border-radius: 10px; /* Rounded corners */
      padding: 10px; /* Space inside the border */
    }
    .styled-boxTwo {
  border: 3px dashed black; /* Dashed black border */
  border-radius: 10px; /* Rounded corners */
  padding: 10px; /* Space inside the border */
}
   body {
    font-family: 'Cairo', sans-serif;
  }

  </style>
</html>



    `;
    const content2 = `
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Legal Document</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">    
    </head>
    <body style="padding-left:800px; padding-right:800px;" >
     
    
        <div>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><strong><em>&nbsp;</em></strong></p>
            <div class="styled-boxTwo">
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><em><u><span style="font-weight:bold;" dir="rtl">خليد الزوبيحي</span></u></em></p>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><em><u><span style="font-weight:bold;" dir="rtl">مهندس مساح طبوغرافي&nbsp;</span></u></em></p>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><em><u><span style="font-weight:bold;" dir="rtl">الجاعل محل المخابرة معه بزنقة أناطول فرانس، إقامة سلمى ب، الشقة 3 الجديدة</span></u></em></p>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><strong><em><u>06-62-06-42-16</u></em></strong></p>
    
            </div>
            
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:20pt;"><strong><span style="color:#0000ff;">&nbsp;</span></strong></p>
            <p  class="styled-box" style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:20pt;"><span dir="rtl"><strong><em><u>&nbsp;</u></em></strong><strong><em><u>بســــم اللـــه الرحمــــان الرحيـــم</u></em></strong></span></p>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:20pt;"><strong><em>&nbsp;</em></strong></p>
            <div style="text-align:center;">
                <table cellspacing="0" cellpadding="0" style="margin-right:auto; margin-left:auto; border:1.5pt double #000000; border-collapse:collapse;">
                    <tbody>
                        <tr>
                        
                            <td style="width:293.2pt; border-right-style:double; border-right-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle;">
                                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">${folder.fileNumber}</p>
                                ${partiesContent}
                            </td>
                                <td style="width:139.5pt; border-left-style:double; border-left-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle; background-color:#f2f2f2;">
                                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">ملف عدد</span></em></p>
                            </td>
                         
                        </tr>
                        <tr>
                              <td style="width:293.2pt; border-top-style:double; border-top-width:1.5pt; border-right-style:double; border-right-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle;">
                                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">----</p>
                            </td>
                            <td style="width:139.5pt; border-top-style:double; border-top-width:1.5pt; border-left-style:double; border-left-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle; background-color:#f2f2f2;">
                                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">حكم تمهيدي صادر بتاريخ</span></em></p>
                            </td>
                      
                          
                        </tr>
                        <tr>
                       
                            <td style="width:293.2pt; border-top-style:double; border-top-width:1.5pt; border-right-style:double; border-right-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle;">
                                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">${folder.experienceDate}</p>
                            </td>
                                 <td style="width:139.5pt; border-top-style:double; border-top-width:1.5pt; border-left-style:double; border-left-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle; background-color:#f2f2f2;">
                                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">تاريخ إجراء الخبرة</span></em></p>
                            </td>
                        
                        </tr>
                        <tr>
                        
                            <td style="width:293.2pt; border-top-style:double; border-top-width:1.5pt; border-right-style:double; border-right-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle;">
                                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl"> ${folder.hour}</span></em></p>
                            </td>
                                <td style="width:139.5pt; border-top-style:double; border-top-width:1.5pt; border-left-style:double; border-left-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle; background-color:#f2f2f2;">
                                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">على الساعة</span></em></p>
                            </td>
                         
                        </tr>
                    </tbody>
                </table>
            </div>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10pt;"><strong><em>&nbsp;</em></strong></p>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:14pt;"><em><u><span style="font-weight:bold;" dir="rtl">إلى السيد (ة)</span></u></em></p>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><em><span style="font-weight:bold;" dir="rtl">   ${lawyer.fullName}</span></em></p>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><em><span style="font-weight:bold;" dir="rtl">   ${lawyer.address}</span></em></p>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><strong><em>&nbsp;</em></strong></p>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><em><u><span style="font-weight:bold;" dir="rtl">استدعاء قانوني لحضور إجراءات خبرة.</span></u></em> : الموضوع</p>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; font-size:16pt;"><strong><em>&nbsp;</em></strong></p>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">&nbsp;</span></em></p>
            <p style="margin-top:0pt; margin-right:21.15pt; margin-bottom:0pt; text-align:right; line-height:150%; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">سيدي (تي)</span></em></p>
            <p style="margin-top:0pt; margin-right:21.15pt; margin-bottom:0pt; text-align:right; line-height:150%; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">تحية طيبة,</span></em></p>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:12pt;"><span dir="rtl"><strong><em>بأمر من المحكمة الابتدائية بالجديدة وبنا ء ا على الحكم لتمهيدي آلذي بمقتضاه عينت خبيرا للقيام بالمهمة المطلوبة المرجو منكم الحضور إلى&nbsp;</em></strong><strong><em><u>عين مكان العقار</u></em></strong><strong><em>&nbsp;حاملين بطاقتكم الوطنية قصد القيام بالمهمة المسندة إلي من طرف المحكمة الموقرة و ذلك في اليوم و الساعة المحددين ٱعلاه.</em></strong></span></p>
            <p style="margin-top:0pt; margin-bottom:0pt; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">والسلام</span></em></p>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10pt;"><span style="font-weight:bold; color:#0000ff;" dir="rtl">&nbsp;</span></p>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">وبه وجب إخباركم.</span></em></p>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><u><span style="font-weight:bold;" dir="rtl">إمضاء</span></u></em></p>
            <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:12pt;"><em><span style="font-weight:bold;" dir="rtl">خليد الزوبيحي</span></em></p>
            <p style="margin-top:0pt; margin-bottom:0pt; font-size:10pt;"><strong><span style="color:#0000ff;">&nbsp;</span></strong></p>
        </div>
    </body>
    <style>
        .styled-box {
          
          border: 4px solid black; /* Solid black border */
          border-radius: 10px; /* Rounded corners */
          padding: 10px; /* Space inside the border */
        }
        .styled-boxTwo {
      border: 3px dashed black; /* Dashed black border */
      border-radius: 10px; /* Rounded corners */
      padding: 10px; /* Space inside the border */
    }
       body {
        font-family: 'Cairo', sans-serif;
      }
    
      </style>
    </html>
    
    
    
        `;

    // Configure PDF options
    const options = {
      margin: 8, // Reduce margin to 0 to maximize content area
      filename: `استدعاء${lawyer.fullName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Convert HTML to PDF
    if (nmb === 1) {
      html2pdf().from(content1).set(options).save();
    }
    if (nmb === 2) {
      html2pdf().from(content2).set(options).save();
    }
  }

  onUpdate() {
    const dialogRef = this.dialog.open(UpdateFolderComponent, {
      width: '600px',
      data: { folder: { ...this.folder } },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Updating folder:', result);
      this.fileService.getFileById(this.folderID).subscribe(
        (data) => {
          this.folder = data;
        },
        (error) => {
          console.error('Error fetching folder details:', error);
        }
      );
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: { folderNumber: this.folder.fileNumber },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fileService.deleteFile(this.folderID).subscribe(
          (response) => {
            this.dialog.open(SuccessDialogComponent, {
              width: '350px',
              data: {
                title: 'تمت الازالة بنجاح',
                message: `تمت ازالة الملف بنجاح.`,
              },
            });
            this.route.navigateByUrl('/');
          },
          (error) => console.error('Error deleting file', error)
        );
      }
    });
  }
}
