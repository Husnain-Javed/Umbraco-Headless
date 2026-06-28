import { Routes } from '@angular/router';
import { App } from './app';
import { HomePage } from './pages/home-page/home-page';
import { Lenders } from './pages/lenders/lenders';
import { Investor } from './pages/investor/investor';
import { Aboutus } from './pages/aboutus/aboutus';
import { Leaders } from './pages/leaders/leaders';
import { localeGuard } from './utility/localeGuard';
import { RenderMode, ServerRoute } from '@angular/ssr';

export const routes: Routes = [

      {
     path: ':locale',
     canActivate: [localeGuard],
    children: [
      {
        path: 'home',
        
        component: HomePage
      },
      {
        path: 'lender',
        component: Lenders
      },
       {
        path: 'investor',
        component: Investor
      },
        {
        path: 'aboutus',
        component: Aboutus
      },
      {
        path: 'leaders',
        component: Leaders
      }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'en/home' },
  {
    path: '**',
    redirectTo: 'en/home'
  }
];
