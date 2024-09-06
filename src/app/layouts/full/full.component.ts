import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {

  search: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/home",
      icon: "home",
      menu: "الصفحة الرئيسية",
    },

    {
      link: "/alerts",
      icon: "judge",
      menu: "لائحة القضاة",
    },
    {
      link: "/forms",
      icon: "feature",
      menu: "صفة الاطراف",
    },

    {
      link: "/grid-list",
      icon: "court",
      menu: "لائحة المحاكم",
    },
    {
      link: "/menu",
      icon: "list",
      menu: "لائحة الإجراءات",
    },
    {
      link: "/table",
      icon: "topic",
      menu: "لائحة المواضيع",
    },
   
  ]

}
