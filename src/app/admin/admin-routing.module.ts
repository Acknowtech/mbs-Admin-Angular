import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageComponent } from './languages/language/language.component';
import { AdminComponent } from './admin.component';
import { MetadataComponent } from './metadata/metadata.component';
import { CategoryComponent } from './categorys/category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {TrashLanguagesComponent} from './languages/trash-languages/trash-languages.component';
import {TrashCategoryComponent} from './categorys/trash-category/trash-category.component';
import { CityComponent } from './city/city/city.component';
import { TrashCityComponent } from './city/trash-city/trash-city.component';
import { ExpertsComponent } from './experts/experts/experts.component';
import { CustomerReviewComponent } from './customer-review/customer-review/customer-review.component';
import { LiveSessionsComponent } from './live-sessions/live-sessions/live-sessions.component';


const routes: Routes = [
  {
    path : '',
    component : AdminComponent,
    children : [
      {
        path : '',
        component : DashboardComponent,
        pathMatch : 'full'
      },
      {
        path : 'metadata',
        component : MetadataComponent,
        pathMatch : 'full'
      },
      {
        path : 'language',
        component : LanguageComponent,
        pathMatch : 'full'
      },
      {
        path : 'trash-languages',
        component : TrashLanguagesComponent,
        pathMatch : 'full'
      },
      {
        path : 'category',
        component : CategoryComponent,
        pathMatch : 'full'
      },
      {
        path : 'trash-categories',
        component : TrashCategoryComponent,
        pathMatch : 'full'
      },
      {
        path : 'city',
        component : CityComponent,
        pathMatch : 'full'
      },
      {
        path : 'trash-city',
        component : TrashCityComponent,
        pathMatch : 'full'
      },
      {
        path : 'Experts',
        component : ExpertsComponent,
        pathMatch : 'full'
      },
      {
        path : 'customer-reviews',
        component : CustomerReviewComponent,
        pathMatch : 'full'
      },
      {
        path : 'live-session',
        component : LiveSessionsComponent,
        pathMatch : 'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
