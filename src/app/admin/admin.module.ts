import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelect2Module } from 'ng-select2';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { LanguageComponent } from './languages/language/language.component';
import { CategoryComponent } from './categorys/category/category.component';
import { MetadataComponent } from './metadata/metadata.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrashLanguagesComponent } from './languages/trash-languages/trash-languages.component';
import { TrashCategoryComponent } from './categorys/trash-category/trash-category.component';
import { CityComponent } from './city/city/city.component';
import { TrashCityComponent } from './city/trash-city/trash-city.component';
import { ExpertsComponent } from './experts/experts/experts.component';
import { CustomerReviewComponent } from './customer-review/customer-review/customer-review.component';
import { LiveSessionsComponent } from './live-sessions/live-sessions/live-sessions.component';



@NgModule({
  declarations: [AdminComponent, LanguageComponent, CategoryComponent, MetadataComponent, DashboardComponent, TrashLanguagesComponent, TrashCategoryComponent, CityComponent, TrashCityComponent, ExpertsComponent, CustomerReviewComponent, LiveSessionsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgSelect2Module
  ]
})
export class AdminModule { }
