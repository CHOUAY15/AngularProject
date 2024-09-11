// content.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ContentService {
  getHtmlContentA(data: any, folder: any, nmb: number): string {
    const groupByFeatureDescription: { [key: string]: any[] } =
      folder.parties.reduce((groups: { [key: string]: any[] }, party: any) => {
        const featureDesc = party.feature.description;

        if (!groups[featureDesc]) {
          groups[featureDesc] = [];
        }
        groups[featureDesc].push(party);
        console.log('khdmiiiii', groups);
        return groups;
      }, {});

    let partiesContent = '';
    for (const [description, parties] of Object.entries(
      groupByFeatureDescription
    )) {
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
    if (nmb === 1) {
      return `
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Legal Document</title>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">    
        </head>
        <body style="padding-left:800px; padding-right:800px;" >
         
        
            <div>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><strong><em>&nbsp;</em></strong></p>
                <div class="styled-boxTwo">
                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><em><u><span style="font-weight:bold;" dir="rtl">خليد الزوبيحي</span></u></em></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><em><u><span style="font-weight:bold;" dir="rtl">مهندس مساح طبوغرافي&nbsp;</span></u></em></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><em><u><span style="font-weight:bold;" dir="rtl">الجاعل محل المخابرة معه بزنقة أناطول فرانس، إقامة سلمى ب، الشقة 3 الجديدة</span></u></em></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><strong><em><u>16-42-06-62-06</u></em></strong></p>
        
                </div>
                
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><strong><span style="color:#0000ff;">&nbsp;</span></strong></p>
                <p  style="  border: 4px solid black; border-radius: 10px;  padding: 10px; margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:20pt;"><span dir="rtl"><strong><em><u>&nbsp;</u></em></strong><strong><em><u>بســــم اللـــه الرحمــــان الرحيـــم</u></em></strong></span></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><strong><em>&nbsp;</em></strong></p>
                <div style="text-align:center;">
                    <table cellspacing="0" cellpadding="0" style="margin-right:auto; margin-left:auto; border:1.5pt double #000000; border-collapse:collapse;">
                        <tbody>
                            <tr>
                                      <td style="width:139.5pt; border-left-style:double; border-left-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle; background-color:#f2f2f2;">
                                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:15pt;"><em><span style="font-weight:bold;" dir="rtl">ملف عدد</span></em></p>
                                </td>
                                <td style="width:293.2pt; border-right-style:double; border-right-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle;">
                                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:15pt;"><em><span style="font-weight:bold;" dir="rtl">${folder.fileNumber}</p>
                                    ${partiesContent}
                                </td>
                          
                             
                            </tr>
                            <tr>
                               <td style="width:139.5pt; border-top-style:double; border-top-width:1.5pt; border-left-style:double; border-left-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle; background-color:#f2f2f2;">
                                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:15pt;"><em><span style="font-weight:bold;" dir="rtl">حكم تمهيدي صادر بتاريخ</span></em></p>
                                </td>
                                  <td style="width:293.2pt; border-top-style:double; border-top-width:1.5pt; border-right-style:double; border-right-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle;">
                                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:15pt;"><em><span style="font-weight:bold;" dir="rtl">${folder.judgment}</p>
                                </td>
                             
                          
                              
                            </tr>
                            <tr>
                                  <td style="width:139.5pt; border-top-style:double; border-top-width:1.5pt; border-left-style:double; border-left-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle; background-color:#f2f2f2;">
                                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:15pt;"><em><span style="font-weight:bold;" dir="rtl">تاريخ إجراء الخبرة</span></em></p>
                                </td>
                                <td style="width:293.2pt; border-top-style:double; border-top-width:1.5pt; border-right-style:double; border-right-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle;">
                                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:15pt;"><em><span style="font-weight:bold;" dir="rtl">${folder.experienceDate}</p>
                                </td>
                              
                            
                            </tr>
                            <tr>
                                    <td style="width:139.5pt; border-top-style:double; border-top-width:1.5pt; border-left-style:double; border-left-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle; background-color:#f2f2f2;">
                                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:15pt;"><em><span style="font-weight:bold;" dir="rtl">على الساعة</span></em></p>
                                </td>
                                <td style="width:293.2pt; border-top-style:double; border-top-width:1.5pt; border-right-style:double; border-right-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle;">
                                    <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:15pt;"><em><span style="font-weight:bold;" dir="rtl"> ${folder.hour}</span></em></p>
                                </td>
                            
                             
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10pt;"><strong><em>&nbsp;</em></strong></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:16pt;"><em><u><span style="font-weight:bold;" dir="rtl">إلى السيد (ة)</span></u></em></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:18pt;"><em><span style="font-weight:bold;" dir="rtl">الأستاذ(ة)   ${data.fullName}</span></em></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:18pt;"><em><span style="font-weight:bold;" dir="rtl">محامي بهيئة ${data.bar.name}</span></em></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><strong><em>&nbsp;</em></strong></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><em><u><span style="font-weight:bold;" dir="rtl">استدعاء قانوني لحضور إجراءات خبرة.</span></u></em> : الموضوع</p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; font-size:14pt;"><strong><em>&nbsp;</em></strong></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; font-size:14pt;"><em><span style="font-weight:bold;" dir="rtl">&nbsp;</span></em></p>
                <p style="margin-top:0pt; margin-right:21.15pt; margin-bottom:0pt; text-align:right; line-height:150%; font-size:16pt;"><em><span style="font-weight:bold;" dir="rtl">سيدي (تي)</span></em></p>
                <p style="margin-top:0pt; margin-right:21.15pt; margin-bottom:0pt; text-align:right; line-height:150%; font-size:16pt;"><em><span style="font-weight:bold;" dir="rtl">تحية طيبة,</span></em></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:16pt;"><span dir="rtl"><strong><em>بأمر من المحكمة الابتدائية بالجديدة وبنا ء ا على الحكم لتمهيدي آلذي بمقتضاه عينت خبيرا للقيام بالمهمة المطلوبة المرجو منكم الحضور إلى&nbsp;</em></strong><strong><em><u>عين مكان العقار</u></em></strong><strong><em>&nbsp;حاملين بطاقتكم الوطنية قصد القيام بالمهمة المسندة إلي من طرف المحكمة الموقرة و ذلك في اليوم و الساعة المحددين ٱعلاه.</em></strong></span></p>
                <p style="margin-top:0pt; margin-bottom:0pt; font-size:16pt;"><em><span style="font-weight:bold;" dir="rtl">والسلام</span></em></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10pt;"><span style="font-weight:bold; color:#0000ff;" dir="rtl">&nbsp;</span></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; font-size:16pt;"><em><span style="font-weight:bold;" dir="rtl">وبه وجب إخباركم.</span></em></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><em><u><span style="font-weight:bold;" dir="rtl">إمضاء</span></u></em></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><em><span style="font-weight:bold;" dir="rtl">خليد الزوبيحي</span></em></p>
                <p style="margin-top:0pt; margin-bottom:0pt; font-size:10pt;"><strong><span style="color:#0000ff;">&nbsp;</span></strong></p>
            </div>
        </body>
        
        </html>
        `;
    } else {
      return `
        <html lang="ar" dir="rtl">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Legal Document</title>
       <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">    
       </head>
       <body style="padding-left:800px; padding-right:800px;" >
        
       
           <div>
               <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><strong><em>&nbsp;</em></strong></p>
               <div class="styled-boxTwo">
                   <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><em><u><span style="font-weight:bold;" dir="rtl">خليد الزوبيحي</span></u></em></p>
               <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><em><u><span style="font-weight:bold;" dir="rtl">مهندس مساح طبوغرافي&nbsp;</span></u></em></p>
               <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><em><u><span style="font-weight:bold;" dir="rtl">الجاعل محل المخابرة معه بزنقة أناطول فرانس، إقامة سلمى ب، الشقة 3 الجديدة</span></u></em></p>
               <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><strong><em><u>16-42-06-62-06</u></em></strong></p>
       
               </div>
               
               <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><strong><span style="color:#0000ff;">&nbsp;</span></strong></p>
                <p  style="  border: 4px solid black; border-radius: 10px;  padding: 10px; margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:20pt;"><span dir="rtl"><strong><em><u>&nbsp;</u></em></strong><strong><em><u>بســــم اللـــه الرحمــــان الرحيـــم</u></em></strong></span></p>
               <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><strong><em>&nbsp;</em></strong></p>
               <div style="text-align:center;">
                   <table cellspacing="0" cellpadding="0" style="margin-right:auto; margin-left:auto; border:1.5pt double #000000; border-collapse:collapse;">
                       <tbody>
                           <tr>
                                     <td style="width:139.5pt; border-left-style:double; border-left-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle; background-color:#f2f2f2;">
                                   <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:15pt;"><em><span style="font-weight:bold;" dir="rtl">ملف عدد</span></em></p>
                               </td>
                               <td style="width:293.2pt; border-right-style:double; border-right-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle;">
                                   <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:15pt;"><em><span style="font-weight:bold;" dir="rtl">${folder.fileNumber}</p>
                                   ${partiesContent}
                               </td>
                         
                            
                           </tr>
                           <tr>
                               <td style="width:139.5pt; border-top-style:double; border-top-width:1.5pt; border-left-style:double; border-left-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle; background-color:#f2f2f2;">
                                   <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:15pt;"><em><span style="font-weight:bold;" dir="rtl">حكم تمهيدي صادر بتاريخ</span></em></p>
                               </td>
                                 <td style="width:293.2pt; border-top-style:double; border-top-width:1.5pt; border-right-style:double; border-right-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle;">
                                   <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:15pt;"><em><span style="font-weight:bold;" dir="rtl">${folder.judgment}</p>
                               </td>
                           
                         
                             
                           </tr>
                           <tr>
                                   <td style="width:139.5pt; border-top-style:double; border-top-width:1.5pt; border-left-style:double; border-left-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle; background-color:#f2f2f2;">
                                   <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:15pt;"><em><span style="font-weight:bold;" dir="rtl">تاريخ إجراء الخبرة</span></em></p>
                               </td>
                               <td style="width:293.2pt; border-top-style:double; border-top-width:1.5pt; border-right-style:double; border-right-width:1.5pt; border-bottom-style:double; border-bottom-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle;">
                                   <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:15pt;"><em><span style="font-weight:bold;" dir="rtl">${folder.experienceDate}</p>
                               </td>
                           
                           
                           </tr>
                           <tr>
                                  <td style="width:139.5pt; border-top-style:double; border-top-width:1.5pt; border-left-style:double; border-left-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle; background-color:#f2f2f2;">
                                   <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:15pt;"><em><span style="font-weight:bold;" dir="rtl">على الساعة</span></em></p>
                               </td>
                               <td style="width:293.2pt; border-top-style:double; border-top-width:1.5pt; border-right-style:double; border-right-width:1.5pt; padding-right:4.65pt; padding-left:4.65pt; vertical-align:middle;">
                                   <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:15pt;"><em><span style="font-weight:bold;" dir="rtl"> ${folder.hour}</span></em></p>
                               </td>
                            
                            
                           </tr>
                       </tbody>
                   </table>
               </div>
               <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10pt;"><strong><em>&nbsp;</em></strong></p>
               <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:14pt;"><em><u><span style="font-weight:bold;" dir="rtl">إلى السيد (ة)</span></u></em></p>
               <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:18pt;"><em><span style="font-weight:bold;" dir="rtl">   ${data.fullName}</span></em></p>
               <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:18pt;"><em><span style="font-weight:bold;" dir="rtl">   ${data.address}</span></em></p>
               <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:14pt;"><strong><em>&nbsp;</em></strong></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><em><u><span style="font-weight:bold;" dir="rtl">استدعاء قانوني لحضور إجراءات خبرة.</span></u></em> : الموضوع</p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; font-size:14pt;"><strong><em>&nbsp;</em></strong></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; font-size:16pt;"><em><span style="font-weight:bold;" dir="rtl">&nbsp;</span></em></p>
                <p style="margin-top:0pt; margin-right:21.15pt; margin-bottom:0pt; text-align:right; line-height:150%; font-size:16pt;"><em><span style="font-weight:bold;" dir="rtl">سيدي (تي)</span></em></p>
                <p style="margin-top:0pt; margin-right:21.15pt; margin-bottom:0pt; text-align:right; line-height:150%; font-size:16pt;"><em><span style="font-weight:bold;" dir="rtl">تحية طيبة,</span></em></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; line-height:150%; font-size:16pt;"><span dir="rtl"><strong><em>بأمر من المحكمة الابتدائية بالجديدة وبنا ء ا على الحكم لتمهيدي آلذي بمقتضاه عينت خبيرا للقيام بالمهمة المطلوبة المرجو منكم الحضور إلى&nbsp;</em></strong><strong><em><u>عين مكان العقار</u></em></strong><strong><em>&nbsp;حاملين بطاقتكم الوطنية قصد القيام بالمهمة المسندة إلي من طرف المحكمة الموقرة و ذلك في اليوم و الساعة المحددين ٱعلاه.</em></strong></span></p>
                <p style="margin-top:0pt; margin-bottom:0pt; font-size:16pt;"><em><span style="font-weight:bold;" dir="rtl">والسلام</span></em></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10pt;"><span style="font-weight:bold; color:#0000ff;" dir="rtl">&nbsp;</span></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:right; font-size:16pt;"><em><span style="font-weight:bold;" dir="rtl">وبه وجب إخباركم.</span></em></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><em><u><span style="font-weight:bold;" dir="rtl">إمضاء</span></u></em></p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:16pt;"><em><span style="font-weight:bold;" dir="rtl">خليد الزوبيحي</span></em></p>
                <p style="margin-top:0pt; margin-bottom:0pt; font-size:10pt;"><strong><span style="color:#0000ff;">&nbsp;</span></strong></p>
           </div>
       </body>
   
       </html>
       `;
    }
  }

  getHtmlContentB(person: any, folder: any, nmb: number): string {
    const today = new Date();
    if (nmb === 1) {
      return `
      <html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Legal Document</title>
    <style>
      body {
        width: 33.33%;
        margin: 0 auto;
        padding: 24px 16px;
        font-family: Arial, sans-serif;
      }
      .container {
        display: flex;
        gap: 12px;
      }
      .main-content {
        width: 66.67%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .sidebar {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .title {
        border: 8px double black;
        padding: 8px 24px;
        width: 50%;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .subtitle {
        width: 50%;
        margin-bottom: 4px;
        text-align: center;
        font-weight: 600;
        text-decoration: underline;
      }
      .dashed-box {
        border: 2px dashed black;
        padding: 20px 0;
        width: 100%;
        margin-bottom: 8px;
      }
      .name-box {
        border: 2px dashed black;
        padding: 4px 0;
        width: 100%;
        margin-bottom: 8px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }
      .date-box {
        display: flex;
        flex-direction: row;
        gap: 12px;
        justify-content: center;
        align-items: center;
        border-bottom: 8px dashed black;
        width: 100%;
        padding-bottom: 36px;
        margin-bottom: 8px;
      }

      .date-input {
        border: 2px dashed black;
        padding: 4px 24px;
      }
      .signature-boxes {
        display: flex;
        justify-content: center;
        gap: 36px;
        width: 83.33%;
        margin-bottom: 8px;
      }
      .signature-box {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .signature-field {
        border: 2px dashed black;
        padding: 32px 0;
        width: 128px;
      }
      .footer {
        border-bottom: 8px dashed black;
        width: 100%;
        padding-bottom: 16px;
        display: flex;
        justify-content: center;
      }
      .footer-box {
        border: 2px dashed black;
        padding: 40px 0;
        width: 50%;
      }
      .info-box {
        border: 8px double black;
        padding: 4px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
        text-decoration: underline;
      }
      .details-box {
        border: 8px double black;
        padding: 24px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 36px;
      }
      .note-box {
        border: 2px dashed black;
        padding: 4px 8px;
      }
      .underline {
        text-decoration: underline;
      }
      .text-center {
        text-align: center;
      }
      .rtl {
        direction: rtl;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="main-content">
        <div class="title rtl">شهادة التسليم</div>
        <div class="subtitle">إلى المفوض القضائي</div>
        <div class="dashed-box"></div>
        <div dir="rtl">
          الرجاء منكم العمل على تبليغ الإستدعاء المرفق بهاته الشهادة إلى
          السيد(ة)
        </div>
        <div class="name-box" dir="rtl"> الأستاذ(ة) ${person.fullName}</div>
        <div class="underline text-center" dir="rtl">عنوانه (ا)</div>
        <div class="name-box" dir="rtl">محامي(ة) ب${person.bar.name}</div>
        <div>
          والمتعلق بالإجراء المذكور طيه وإرجاع هاته الشهادة بعد ملئها ملأ دقيقا
        </div>
        <div class="date-box rtl">
          <div>
            <div class="text-center">حرر بالجديدة في</div>
            <div class="date-input">${today.getFullYear()}-${
        today.getMonth() + 1
      }-${today.getDate()}</div>
          </div>
        </div>
        <div class="text-center">
          ان المفوض القضائي المكلف بالتبليغ يشهد بان الاستدعاء المرفق بهذه
          الشهاده قد سلم بتاريخ
        </div>
        <div class="dashed-box" style="width: 66.67%"></div>
        <div class="underline text-center" dir="rtl">إلى السيد(ة)</div>
        <div class="dashed-box"></div>
        <div class="signature-boxes">
          <div class="signature-box">
            <p>لا يستطيع التوقيع</p>
            <div class="signature-field"></div>
          </div>
          <div class="signature-box">
            <p>رفض التوقيع</p>
            <div class="signature-field"></div>
          </div>
          <div class="signature-box">
            <p>توقيعه</p>
            <div class="signature-field"></div>
          </div>
        </div>
        <div class="text-center">توقيع المفوض القضائي</div>
        <div class="footer">
          <div class="footer-box"></div>
        </div>
        <div
          class="text-center underline"
          style="
            border-bottom: 8px dashed black;
            width: 100%;
            padding-bottom: 36px;
          "
        >
          <p>يرجع بعد التبليغ الى السيد خالد الزوبيحي</p>
          <p>
            الجاعل محل المخابرة معه بزنقة اناطول فرانس، اقامة سلمى ،الشقة 3
            الجديدة
          </p>
        </div>
      </div>
      <div class="sidebar">
        <div class="info-box">
          <p>خالدالزوبيحي</p>
          <p>مهندس مساح طبوغرافي</p>
          <p>
            الجاعل محل المخابرة معه بزنقة اناطول فرانس، اقامة سلمى ،الشقة 3
            الجديدة
          </p>
          <p>06-62-06-42-16</p>
        </div>
        <div class="details-box">
          <p class="underline">ملف عدد</p>
          <p>${folder.fileNumber}</p>
          <p class="underline">حكم تمهيدي بتاريخ</p>
          <p>----------------</p>
          <p class="underline">تاريخ اجراء الخبرة</p>
          <p>${folder.experienceDate}</p>
          <p class="underline">على الساعة</p>
          <p dir="rtl">${folder.hour}</p>
        </div>
        <div class="note-box">
          <p>يذكر اسم الشخص المستلم وصفته</p>
        </div>
      </div>
    </div>
  </body>
</html>
    `;
    } else {
      return `
     <html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Legal Document</title>
    <style>
      body {
        width: 33.33%;
        margin: 0 auto;
        padding: 24px 16px;
        font-family: Arial, sans-serif;
      }
      .container {
        display: flex;
        gap: 12px;
      }
      .main-content {
        width: 66.67%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .sidebar {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .title {
        border: 8px double black;
        padding: 8px 24px;
        width: 50%;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .subtitle {
        width: 50%;
        margin-bottom: 4px;
        text-align: center;
        font-weight: 600;
        text-decoration: underline;
      }
      .dashed-box {
        border: 2px dashed black;
        padding: 20px 0;
        width: 100%;
        margin-bottom: 8px;
      }
      .name-box {
        border: 2px dashed black;
        padding: 4px 0;
        width: 100%;
        margin-bottom: 8px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }
      .date-box {
        display: flex;
        flex-direction: row;
        gap: 12px;
        justify-content: center;
        align-items: center;
        border-bottom: 8px dashed black;
        width: 100%;
        padding-bottom: 36px;
        margin-bottom: 8px;
      }

      .date-input {
        border: 2px dashed black;
        padding: 4px 24px;
      }
      .signature-boxes {
        display: flex;
        justify-content: center;
        gap: 36px;
        width: 83.33%;
        margin-bottom: 8px;
      }
      .signature-box {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .signature-field {
        border: 2px dashed black;
        padding: 32px 0;
        width: 128px;
      }
      .footer {
        border-bottom: 8px dashed black;
        width: 100%;
        padding-bottom: 16px;
        display: flex;
        justify-content: center;
      }
      .footer-box {
        border: 2px dashed black;
        padding: 40px 0;
        width: 50%;
      }
      .info-box {
        border: 8px double black;
        padding: 4px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
        text-decoration: underline;
      }
      .details-box {
        border: 8px double black;
        padding: 24px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 36px;
      }
      .note-box {
        border: 2px dashed black;
        padding: 4px 8px;
      }
      .underline {
        text-decoration: underline;
      }
      .text-center {
        text-align: center;
      }
      .rtl {
        direction: rtl;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="main-content">
        <div class="title rtl">شهادة التسليم</div>
        <div class="subtitle">إلى المفوض القضائي</div>
        <div class="dashed-box"></div>
        <div dir="rtl">
          الرجاء منكم العمل على تبليغ الإستدعاء المرفق بهاته الشهادة إلى
          السيد(ة)
        </div>
        <div class="name-box" dir="rtl">${person.fullName}</div>
        <div class="underline text-center" dir="rtl">عنوانه (ا)</div>
        <div class="name-box" dir="rtl">${person.address}</div>
        <div>
          والمتعلق بالإجراء المذكور طيه وإرجاع هاته الشهادة بعد ملئها ملأ دقيقا
        </div>
        <div class="date-box rtl">
          <div>
            <div class="text-center">حرر بالجديدة في</div>
            <div class="date-input">${today.getFullYear()}-${
        today.getMonth() + 1
      }-${today.getDate()}</div>
          </div>
        </div>
        <div class="text-center">
          ان المفوض القضائي المكلف بالتبليغ يشهد بان الاستدعاء المرفق بهذه
          الشهاده قد سلم بتاريخ
        </div>
        <div class="dashed-box" style="width: 66.67%"></div>
        <div class="underline text-center" dir="rtl">إلى السيد(ة)</div>
        <div class="dashed-box"></div>
        <div class="signature-boxes">
          <div class="signature-box">
            <p>لا يستطيع التوقيع</p>
            <div class="signature-field"></div>
          </div>
          <div class="signature-box">
            <p>رفض التوقيع</p>
            <div class="signature-field"></div>
          </div>
          <div class="signature-box">
            <p>توقيعه</p>
            <div class="signature-field"></div>
          </div>
        </div>
        <div class="text-center">توقيع المفوض القضائي</div>
        <div class="footer">
          <div class="footer-box"></div>
        </div>
        <div
          class="text-center underline"
          style="
            border-bottom: 8px dashed black;
            width: 100%;
            padding-bottom: 36px;
          "
        >
          <p>يرجع بعد التبليغ الى السيد خالد الزوبيحي</p>
          <p>
            الجاعل محل المخابرة معه بزنقة اناطول فرانس، اقامة سلمى ،الشقة 3
            الجديدة
          </p>
        </div>
      </div>
      <div class="sidebar">
        <div class="info-box">
          <p>خالدالزوبيحي</p>
          <p>مهندس مساح طبوغرافي</p>
          <p>
            الجاعل محل المخابرة معه بزنقة اناطول فرانس، اقامة سلمى ،الشقة 3
            الجديدة
          </p>
          <p>06-62-06-42-16</p>
        </div>
        <div class="details-box">
          <p class="underline">ملف عدد</p>
          <p>${folder.fileNumber}</p>
          <p class="underline">حكم تمهيدي بتاريخ</p>
          <p>----------------</p>
          <p class="underline">تاريخ اجراء الخبرة</p>
          <p>${folder.experienceDate}</p>
          <p class="underline">على الساعة</p>
          <p dir="rtl">${folder.hour}</p>
        </div>
        <div class="note-box">
          <p>يذكر اسم الشخص المستلم وصفته</p>
        </div>
      </div>
    </div>
  </body>
</html>
    `;
    }
  }
}
