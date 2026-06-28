import { CommonModule } from '@angular/common';
// @ts-ignore: no declaration file for module 'aos'
import AOS from 'aos';
import { Component, input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-stat',
  imports: [CommonModule],
  templateUrl: './stat.html',
  styleUrl: './stat.css',
})
export class Stat implements OnInit {

  constructor(private sanitizer: DomSanitizer){}
   StatCollection = input<any>();
ngOnInit() {


}


  ngAfterViewInit() {
     

      AOS.init({
           duration: 1000,
           once: true
         });
  //   const children = this.StatCollection()?.children ?? [];

  // children.forEach((item: any, index: number) => {
  //   item.properties.stat_svg = this.sanitizer
  //     .bypassSecurityTrustHtml(item.properties?.stat_svg);
  // });
  }
sanitizeSVG(stat_svg : string){

  return this.sanitizer
      .bypassSecurityTrustHtml(stat_svg);
}

}
