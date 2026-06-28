import { Component, input } from '@angular/core';

@Component({
  selector: 'app-agm',
  imports: [],
  templateUrl: './agm.html',
  styleUrl: './agm.css',
})
export class AGM {
  MeetingsList = input<any>();


  GetDate(date : any){
  const dateValue = new Date(date);

  return dateValue.getDate(); 
  }
  GetMonth(date : any){
   return new Date(date)
    .toLocaleString('en-US', { month: 'short' })
    .toUpperCase();
  }



}
