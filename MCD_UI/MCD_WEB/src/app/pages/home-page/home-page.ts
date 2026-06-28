import { Component, OnInit, signal } from '@angular/core';
import { Stat } from '../partials/stat/stat';
// @ts-ignore: no declaration file for module 'aos'
import AOS from 'aos';
import { OpenAccount } from '../partials/open-account/open-account';
import { AGM } from '../partials/agm/agm';
import { Membership } from '../partials/membership/membership';
import { HeroSection } from '../partials/hero-section/hero-section';
import { HttpService } from '../../utility/http.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslatePipe } from '../../utility/pipe/TranslatePipe';


@Component({
  selector: 'app-home-page',
  imports: [TranslatePipe,Stat, OpenAccount, AGM, Membership, HeroSection, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
ngAfterViewInit() {
  AOS.init();
}
  constructor(private router: Router,private httpService  : HttpService,  private sanitizer: DomSanitizer){

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      AOS.refresh();
    });

this.GetHomePageData();
this.GetSpecialAlert();
  }
  ngOnInit(): void {
     AOS.init();
  }
StatList = signal<any>(null);
Home = signal<any>(null);
Meetings = signal<any>(null);
Clients = signal<any>(null);
DisplayalertModel = signal(false);
Specialalert = signal<any>(null);

  getMediaUrl(url:any){
   return url 
       ?  environment.umbracoBaseUrl +  url
       : '';
 }

 GetHomePageData() {
   
    this.httpService.GetAll('Umbraco/GetHomePage').subscribe((data) => {
   this.Home.set(data);
  let allchildren = data.children; 

  const statCollectionSection = allchildren.find((child: { contentType: string; }) => child.contentType === "statCollection");

    const meetinglistCollectionSection = allchildren.find((child: { contentType: string; }) => child.contentType === "meetingList");
  const clientsList = allchildren.find((child: { contentType: string; }) => child.contentType === "clients");

        this.StatList.set(statCollectionSection);
        this.Meetings.set(meetinglistCollectionSection);
       this.Clients.set(clientsList);
      

              
        

       



     
    });

  }


   GetSpecialAlert() {
   
    this.httpService.GetAll('Umbraco/GetSpecialAlert').subscribe((data) => {
   this.Specialalert.set(data);



if(this.Specialalert() && this.Specialalert()?.properties.alert_isVisible == true){
this.DisplayalertModel.set(true);
}

    });

  }

  CloseSpecialalert(){
    this.DisplayalertModel.set(false);
  }

   transform(value: string): SafeHtml {

    return this.sanitizer.bypassSecurityTrustHtml(value);

  }
}
