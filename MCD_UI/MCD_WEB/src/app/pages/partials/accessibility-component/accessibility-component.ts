import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '../../../utility/pipe/TranslatePipe';


@Component({
  selector: 'app-accessibility',
  imports: [ TranslatePipe ],
  templateUrl: './accessibility-component.html',
  styleUrl: './accessibility-component.css'
})
export class AccessibilityComponent {

showAccessibility = false;
  @ViewChild('accPanel')
accPanel!: ElementRef;


  fontSize = 100;
  spacing = 0;

  isBrowser = false;


  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: Object
  ) {

    this.isBrowser = isPlatformBrowser(platformId);

  }



  showPanel() {

    if (!this.isBrowser) return;

    this.renderer.addClass(
      this.accPanel.nativeElement,
      'show'
    );

      this.showAccessibility = true;
  }



  hidePanel() {

    if (!this.isBrowser) return;

    this.renderer.removeClass(
      this.accPanel.nativeElement,
      'show'
    );

      this.showAccessibility = false;
  }



  increaseFont() {

    if (!this.isBrowser) return;


    if (this.fontSize < 150) {

      this.fontSize += 10;

      this.renderer.setStyle(
        document.documentElement,
        'font-size',
        this.fontSize + '%'
      );
    }
  }



  decreaseFont() {

    if (!this.isBrowser) return;


    if (this.fontSize > 80) {

      this.fontSize -= 10;


      this.renderer.setStyle(
        document.documentElement,
        'font-size',
        this.fontSize + '%'
      );
    }
  }



  toggleContrast(event: Event) {

    if (!this.isBrowser) return;


    const checked =
      (event.target as HTMLInputElement).checked;


    this.renderer.setStyle(
      document.body,
      'filter',
      checked
        ? 'contrast(1.4)'
        : ''
    );

  }




  toggleDark(event: Event) {

    if (!this.isBrowser) return;


    const checked =
      (event.target as HTMLInputElement).checked;


    if (checked) {

      this.renderer.addClass(
        document.body,
        'dark-mode'
      );

    }
    else {

      this.renderer.removeClass(
        document.body,
        'dark-mode'
      );

    }

  }





  increaseSpacing() {

    if (!this.isBrowser) return;


    if (this.spacing < 5) {

      this.spacing++;


      this.renderer.setStyle(
        document.body,
        'letter-spacing',
        this.spacing + 'px'
      );

    }

  }




  decreaseSpacing() {

    if (!this.isBrowser) return;


    if (this.spacing > 0) {

      this.spacing--;


      this.renderer.setStyle(
        document.body,
        'letter-spacing',
        this.spacing
          ? this.spacing + 'px'
          : ''
      );

    }

  }





  reset() {

    if (!this.isBrowser) return;


    this.fontSize = 100;
    this.spacing = 0;


    this.renderer.removeStyle(
      document.documentElement,
      'font-size'
    );


    this.renderer.removeStyle(
      document.body,
      'filter'
    );


    this.renderer.removeStyle(
      document.body,
      'letter-spacing'
    );


    this.renderer.removeClass(
      document.body,
      'dark-mode'
    );

  }

}