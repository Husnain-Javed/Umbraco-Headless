import { Component, signal } from '@angular/core';
import { Stat } from '../partials/stat/stat';
import { HttpService } from '../../utility/http.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-lenders',
 imports: [Stat],
  templateUrl: './lenders.html',
  styleUrl: './lenders.css',
})
export class Lenders {

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
