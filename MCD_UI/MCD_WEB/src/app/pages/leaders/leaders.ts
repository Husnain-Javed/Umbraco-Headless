import {
  Component,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ElementRef,
  signal
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../utility/http.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import gsap from 'gsap';
import { filter, Subscription } from 'rxjs';
import { LocaleLinkPipe } from '../../utility/pipe/locale-link.pipe';

@Component({
  selector: 'app-leaders',
  imports: [RouterModule,LocaleLinkPipe],
  templateUrl: './leaders.html',
  styleUrl: './leaders.css',
})
export class Leaders implements OnInit, AfterViewInit, OnDestroy {

  Leaders = signal<any>(null);
  currentIndex = signal<number>(0);
  isBrowser = false;
  isAnimating = false;
  autoSlideInterval: any;

  private initialised = false;
  private routerSub?: Subscription;
  private dataSub?: Subscription;
  private rafId?: number;

  @ViewChildren('teamCard') cards!: QueryList<ElementRef>;

  constructor(
    private httpService: HttpService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.GetLeaders();

    if (!this.isBrowser) return;

    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.stopAutoSlide();
        this.initialised = false;
        this.currentIndex.set(0);
        this.isAnimating = false;
        this.waitForReadyAndInit(); // re-init on every navigation
      });
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.waitForReadyAndInit(); // start waiting on first load
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    this.routerSub?.unsubscribe();
    this.dataSub?.unsubscribe();
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  // ─── Wait until BOTH cards and data are ready ─────────────────────────────
  // Polls every animation frame — exits as soon as both conditions are met
  // Guaranteed to work regardless of which arrives first (cards or data)

  private waitForReadyAndInit(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);

    const check = () => {
      const hasCards = this.cards?.length > 0;
      const hasData = !!this.Leaders();

      if (hasCards && hasData && !this.initialised) {
        this.initialised = true;
        // One extra rAF to ensure GSAP can read layout dimensions
        requestAnimationFrame(() => {
          this.updateCarousel(0, false);
          this.startAutoSlide();
        });
        return; // stop polling
      }

      // Not ready yet — check again next frame
      this.rafId = requestAnimationFrame(check);
    };

    this.rafId = requestAnimationFrame(check);
  }

  // ─── Data ─────────────────────────────────────────────────────────────────

  GetLeaders(): void {
    this.dataSub = this.httpService
      .GetAll('Umbraco/GetLeaders')
      .subscribe((data) => {
        data.children = this.sortMenu(data.children);
        this.Leaders.set(data); // waitForReadyAndInit poll will catch this
      });
  }

  // ─── Auto slide ───────────────────────────────────────────────────────────

  startAutoSlide(): void {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.updateCarousel(this.currentIndex() + 1);
    }, 3000);
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  // ─── Carousel ─────────────────────────────────────────────────────────────

  updateCarousel(index: number, animate = true): void {
    if (!this.isBrowser || !this.cards?.length) return;
    if (this.isAnimating && animate) return;
    if (animate) this.isAnimating = true;

    const cards = this.cards.toArray();
    this.currentIndex.set((index + cards.length) % cards.length);

    const config = this.getSpacing();

    cards.forEach((cardRef, i) => {
      const card = cardRef.nativeElement;

      let offset = i - this.currentIndex();
      if (offset > cards.length / 2) offset -= cards.length;
      if (offset < -cards.length / 2) offset += cards.length;

      let x = 0, z = 0, scale = 1, opacity = 1, gray = 100;

      if (offset === 0) {
        scale = config.mainScale; gray = 0;
      } else if (offset === 1) {
        x = config.xGap1; z = -80; scale = config.sideScale; opacity = .9;
      } else if (offset === -1) {
        x = -config.xGap1; z = -80; scale = config.sideScale; opacity = .9;
      } else if (offset === 2) {
        x = config.xGap2; z = -250; scale = .65; opacity = .5;
      } else if (offset === -2) {
        x = -config.xGap2; z = -250; scale = .65; opacity = .5;
      } else {
        opacity = 0; scale = .5;
        x = offset > 0 ? 250 : -250;
      }

      gsap.to(card, {
        x, z, scale, opacity,
        filter: `grayscale(${gray}%)`,
        duration: animate ? .6 : 0,
        ease: 'power2.out'
      });
    });

    setTimeout(() => { this.isAnimating = false; }, 500);
  }

  previous(): void {
    this.stopAutoSlide();
    this.updateCarousel(this.currentIndex() - 1);
    this.startAutoSlide();
  }

  next(): void {
    this.stopAutoSlide();
    this.updateCarousel(this.currentIndex() + 1);
    this.startAutoSlide();
  }

  goTo(index: number): void {
    this.stopAutoSlide();
    this.updateCarousel(index);
    this.startAutoSlide();
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  getSpacing() {
    const width = window.innerWidth;
    if (width <= 480) return { xGap1: 65, xGap2: 110, mainScale: 1, sideScale: .8 };
    if (width <= 992) return { xGap1: 110, xGap2: 180, mainScale: 1.05, sideScale: .85 };
    return { xGap1: 220, xGap2: 400, mainScale: 1.1, sideScale: .9 };
  }

  getMediaUrl(url: any) {
    return url ? environment.umbracoBaseUrl + url : '';
  }

  sortMenu(items: any[]): any[] {
    return (items ?? [])
      .sort((a, b) =>
        Number(a.properties?.orderNo ?? 0) - Number(b.properties?.orderNo ?? 0)
      )
      .map(item => ({ ...item, children: this.sortMenu(item.children) }));
  }
}