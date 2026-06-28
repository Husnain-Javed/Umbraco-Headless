import { HttpSentEvent } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { HttpService } from '../../utility/http.service';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
import { LocaleLinkPipe } from '../../utility/pipe/locale-link.pipe';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-aboutus',
  imports: [RouterModule,LocaleLinkPipe],
  templateUrl: './aboutus.html',
  styleUrl: './aboutus.css',
})
export class Aboutus implements OnInit {

  AboutUs = signal<any>(null);
constructor(private httpService  : HttpService,  private sanitizer: DomSanitizer){

}
  ngOnInit(): void {
    this.GetAboutUs();
  }
 getMediaUrl(url:any){
   return url 
       ?  environment.umbracoBaseUrl +  url
       : '';
 }

  GetAboutUs() {
   
    this.httpService.GetAll('Umbraco/GetAboutUs').subscribe((data) => {
   this.AboutUs.set(data);
 console.log(this.AboutUs());
    });

  }

     transform(value: string): SafeHtml {

    return this.sanitizer.bypassSecurityTrustHtml(value);

  }

}
