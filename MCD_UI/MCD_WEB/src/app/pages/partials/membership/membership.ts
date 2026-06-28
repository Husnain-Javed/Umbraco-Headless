import { Component, input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-membership',
  imports: [],
  templateUrl: './membership.html',
  styleUrl: './membership.css',
})
export class Membership {

  ClientsList = input<any>();

  constructor(){

  }

   getMediaUrl(url:any){
    return url 
        ?  environment.umbracoBaseUrl +  url
        : '';
  }

}
