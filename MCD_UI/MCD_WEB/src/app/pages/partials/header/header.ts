import { Component, ElementRef, HostListener, inject, input, Input, OnInit, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { HttpService } from '../../../utility/http.service';


import { CommonModule, isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../../utility/language.service';
import { LocaleLinkPipe } from '../../../utility/pipe/locale-link.pipe';
import { UserSessionService } from '../../../utility/UserSessionService';
import { AccessibilityComponent } from '../accessibility-component/accessibility-component';
import { TranslationService } from '../../../utility/TranslationService';
import { TranslatePipe } from '../../../utility/pipe/TranslatePipe';
export class LoginModel {
  Ref: string = '';
  Pass: string = '';
}
@Component({
  selector: 'app-header',
  imports: [ CommonModule, FormsModule,RouterModule , LocaleLinkPipe , AccessibilityComponent , TranslatePipe ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  Model : LoginModel = new LoginModel();
 HomePage = input<any>();

 Languges = signal<any>(null);
 ShowLoginDialog = signal(false);
user = signal<any>(null);
   ApplicationMenu = input<any[]>([]);

  constructor(private userSession : UserSessionService , private languageService : LanguageService, private router: Router,private httpService: HttpService , private cookieService: CookieService) { }
    ngOnInit(): void {
      this.GetLanguages();

      this.userSession.user$.subscribe(user => {
        this.user.set(user);
});


    }

  private languageServicein = inject(LanguageService);
  private routerin = inject(Router);


 

  switchTo(newLocale: string): void {
    // Swap only the locale segment, keep rest of URL intact
    const segments = this.router.url.split('/').filter(Boolean);
    segments[0] = newLocale; // replace 'en' with 'ar' or vice versa

     this.languageService.switchLanguage(newLocale);
   

   
  }
    getMediaUrl(url:any){
  return url 
      ?  environment.umbracoBaseUrl +  url
      : '';
}

private platformId = inject(PLATFORM_ID);





current : any;
  GetLanguages() {
   
    this.httpService.GetAll('Umbraco/Getlanguages').subscribe((data) => {
   this.Languges.set(data);
 

  this.current = this.languageServicein.getCurrentLang()?.urlSegment;


     
    });

  }
ShowLogin(){

  this.ShowLoginDialog.set(true);
}
CloseDialog(){
    this.ShowLoginDialog.set(false);
}

UserLogin(){

    if(this.Model.Ref == ""){
alert("Please fill the required filed.");
return;
    }
    if(this.Model.Pass == ""){
      alert("Please fill the required filed.");
return;
    }
        this.ShowLoginDialog.set(false);
    if(this.Model.Ref == "investor"){

     
this.userSession.setUser("investor");  
      this.languageService.navigateTo('/investor');
    }

    if(this.Model.Ref == "lender"){
   this.userSession.setUser("lender");  
            this.languageService.navigateTo('/lender');
    }
 
}



  isSearchOpen = signal<boolean>(false);


  @ViewChild('searchInput') 
  searchInput!: ElementRef<HTMLInputElement>;



  openSearch(event: Event) {

    event.preventDefault();

    this.isSearchOpen.set(true);


    setTimeout(() => {
      this.searchInput?.nativeElement.focus();
    }, 300);

  }



  closeSearch() {

   
        this.isSearchOpen.set(false);

    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
    }

  }



  // ESC key close
  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {

    if (event.key === 'Escape' && this.isSearchOpen() == true) {
      this.closeSearch();
    }

  }
  
}
