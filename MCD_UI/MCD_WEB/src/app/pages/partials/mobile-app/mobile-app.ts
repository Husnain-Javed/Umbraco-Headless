import { Component, input } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-mobile-app',
  templateUrl: './mobile-app.html',
  styleUrl: './mobile-app.css',
})
export class MobileApp {

  MobileAppSection = input<any>();

  constructor(){

  }

   getMediaUrl(url:any){
      return url 
          ?  environment.umbracoBaseUrl +  url
          : '';
    }
}
