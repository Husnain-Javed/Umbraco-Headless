import { Component, input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
 HomePage = input<any>();
 constructor(){

  
 }

    getMediaUrl(url:any){
   return url 
       ?  environment.umbracoBaseUrl +  url
       : '';
 }

}
