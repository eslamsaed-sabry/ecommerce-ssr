import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  constructor(private translateService: TranslateService, @Inject(PLATFORM_ID) private ID: object) {

    if (isPlatformBrowser(ID)) {
      translateService.setDefaultLang('en')
      let savedLang = localStorage.getItem('myLang')
      if (savedLang) {
        translateService.use(savedLang!)

      }
      this.changeDirection()

    }
  }

  changeDirection(): void {
    if (localStorage.getItem('myLang') == 'en') {
      document.documentElement.setAttribute('dir', 'ltr')
      document.documentElement.setAttribute('lang', 'en')

    }
    else if (localStorage.getItem('myLang') == 'ar') {
      document.documentElement.setAttribute('dir', 'rtl')
      document.documentElement.setAttribute('lanf', 'ar')
    }

  }

  changeLang(lang: string) {
    localStorage.setItem('myLang', lang)
    this.translateService.use(lang)
    this.changeDirection()
 

  }

}
