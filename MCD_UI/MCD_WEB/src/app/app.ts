import { Component, inject, OnInit, PLATFORM_ID, signal ,   AfterViewInit, 
 
  ElementRef, 
  HostListener, 
  QueryList, 
  ViewChildren  } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet ,  } from '@angular/router';


import { Header } from './pages/partials/header/header';
import { OpenAccount } from './pages/partials/open-account/open-account';
import { Stat } from './pages/partials/stat/stat';
import { HeroSection } from './pages/partials/hero-section/hero-section';
import { Footer } from './pages/partials/footer/footer';
import { MobileApp } from './pages/partials/mobile-app/mobile-app';
import { Membership } from './pages/partials/membership/membership';
import { AGM } from './pages/partials/agm/agm';
import { HttpService } from './utility/http.service';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { filter, take } from 'rxjs';
import { LanguageService } from './utility/language.service';
import { LoaderService } from './utility/LoaderService';
import { environment } from '../environments/environment';

declare var AOS: any;
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MobileApp, Footer ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  implements OnInit {
  constructor( public loaderService : LoaderService, private route: ActivatedRoute,
 private langService: LanguageService,private router: Router,private httpService : HttpService,private cookieService: CookieService) {

     this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(() => {

      setTimeout(() => {
        this.initCounters();
      }, 300);

    });

  }

    @ViewChildren('counter') counters!: QueryList<ElementRef>;


  private platformId = inject(PLATFORM_ID);
  ngOnInit(): void {
  this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.loaderService.show();
        }

        if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.loaderService.hide();
        }
      });
    
 
//  this.langService.languageReady$
//  .pipe(
//    filter(Boolean),
//    take(1)
//  )
//  .subscribe(()=>{
// debugger;
//     this.GetHomePageData();

//  });
this.langService.languageReady$
.subscribe(ready => {

  if (ready) {
   this.GetHomePageData();

  }

});


  //   setTimeout(() => {

  //  this.GetHomePageData();

  // }, 1000);
  }

    ngAfterViewInit(): void {

    // Init AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out-cubic'
      });
    }

  if (isPlatformBrowser(this.platformId)) {
    // Small delay ensures SSR-rendered content is visible before hiding loader
    // Prevents flash of unstyled content (FOUC)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.loaderService.hide();
      });
    });
  }
    // Navbar scroll
    this.handleScroll();


    // Counter animation
    this.initCounters();


    // Smooth scroll
    this.initSmoothScroll();

  }


  // Navbar scroll effect
  @HostListener('window:scroll')
  handleScroll() {

    const nav = document.querySelector('.site-navbar');

    if (!nav) return;


    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } 
    else {
      nav.classList.remove('scrolled');
    }

  }



  // Animated counters
  initCounters() {

    const counters = document.querySelectorAll(
      '.stat-value'
    );


    const observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            this.animateCount(
              entry.target as HTMLElement
            );

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.4
      }
    );


    counters.forEach(counter => {
      observer.observe(counter);
    });

  }



  animateCount(element: HTMLElement) {


    const target = Number(
      element.dataset['count']
    );


    const duration = 1800;

    const start = performance.now();


    const formatter = new Intl.NumberFormat('en-US');


    const step = (now:number)=>{


      const progress = Math.min(
        (now - start) / duration,
        1
      );


      const eased =
        1 - Math.pow(1 - progress, 3);


      element.innerText =
        formatter.format(
          Math.floor(target * eased)
        );


      if(progress < 1){
        requestAnimationFrame(step);
      }
      else{
        element.innerText =
          formatter.format(target);
      }

    };


    requestAnimationFrame(step);

  }




  // Smooth scroll anchors
  initSmoothScroll(){


    const links =
      document.querySelectorAll(
        'a[href^="#"]'
      );


    links.forEach(link=>{


      link.addEventListener(
        'click',
        (event)=>{


          const anchor =
            link.getAttribute('href');


          if(anchor && anchor.length > 1){


            const target =
              document.querySelector(anchor);


            if(target){

              event.preventDefault();


              target.scrollIntoView({
                behavior:'smooth'
              });

            }

          }

        });

    });

  }

AppMenu = signal<any[]>([]);
StatList = signal<any[]>([]);
Home = signal<any>(null);
Meetings = signal<any[]>([]);
Clients = signal<any[]>([]);
MobileApp = signal<any[]>([]);
Footer = signal<any[]>([]);

Translations  = signal<any>(null);

  protected readonly title = signal('MCD_WEB');

sortMenu(items: any[], isParent: boolean = true): any[] {

  return (items ?? [])
    .sort((a, b) => {

      const aOrder = isParent
        ? a.properties?.fql_orderNo
        : a.properties?.fqli_orderNo;

      const bOrder = isParent
        ? b.properties?.fql_orderNo
        : b.properties?.fqli_orderNo;

      return Number(aOrder ?? 0) - Number(bOrder ?? 0);

    })
    .map(item => ({
      ...item,
      children: this.sortMenu(item.children, false)
    }));
}
  GetHomePageData() {
 
    this.httpService.GetAll('Umbraco/GetHomePage').subscribe((data) => {
   this.Home.set(data);
  let allchildren = data.children; 
console.log(this.Home());
  const appMenuSection = allchildren.find((child: { contentType: string; }) => child.contentType === "appMenu");
  const statCollectionSection = allchildren.find((child: { contentType: string; }) => child.contentType === "statCollection");

    const meetinglistCollectionSection = allchildren.find((child: { contentType: string; }) => child.contentType === "meetingList");
  const clientsList = allchildren.find((child: { contentType: string; }) => child.contentType === "clients");
  const mobileApplicationSection = allchildren.find((child: { contentType: string; }) => child.contentType === "mobileApplicationSection");
  const footerSection = allchildren.find((child: { contentType: string; }) => child.contentType === "footer");

  

  
  
    this.AppMenu.set( this.sortMenu(appMenuSection?.children , true));
        this.StatList.set(statCollectionSection);
        this.Meetings.set(meetinglistCollectionSection);
       this.Clients.set(clientsList);
              this.MobileApp.set(mobileApplicationSection);
               this.Footer.set(footerSection);

              
        

       



     
    });

  }
      getMediaUrl(url:any){
    return url 
        ?  environment.umbracoBaseUrl +  url
        : '';
  }



}
