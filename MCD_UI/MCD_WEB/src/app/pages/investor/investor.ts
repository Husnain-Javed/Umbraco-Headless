import { Component, OnInit, signal } from '@angular/core';
import { HttpService } from '../../utility/http.service';
import { environment } from '../../../environments/environment';
import { Stat } from '../partials/stat/stat';

@Component({
  selector: 'app-investor',
  imports: [Stat],
  templateUrl: './investor.html',
  styleUrl: './investor.css',
})
export class Investor implements OnInit {
Home = signal<any>({});
StatList = signal<any>(null);
  constructor(private httpService  : HttpService){

  }
  ngOnInit(): void {
    this.GetHomePageData();
  }
   getMediaUrl(url:any){
     return url 
         ?  environment.umbracoBaseUrl +  url
         : '';
   }
  GetHomePageData() {
   
    this.httpService.GetAll('Umbraco/GetHomePage').subscribe((data) => {
   this.Home.set(data);


const statCollectionSection = data.children?.find((child: { contentType: string; }) => child.contentType === "statCollection");
 this.StatList.set(statCollectionSection);

    });

  }
}
