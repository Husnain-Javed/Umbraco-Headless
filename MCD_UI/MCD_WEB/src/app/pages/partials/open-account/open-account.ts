import { Component, input } from '@angular/core';

@Component({
  selector: 'app-open-account',
  imports: [],
  templateUrl: './open-account.html',
  styleUrl: './open-account.css',
})
export class OpenAccount {

 HomePage = input<any>();
 constructor(){
  
 }

}
