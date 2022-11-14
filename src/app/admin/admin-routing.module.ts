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
import { OfferPriceComponent } from './offers/offer-price/offer-price.component';
import { AdminUserComponent } from './users/admin-user/admin-user.component';
import { CustomerComponent } from './users/customer/customer.component';
import { RolesComponent } from './roles-permissions/roles/roles.component';
import { PermissionsComponent } from './roles-permissions/permissions/permissions.component';
import { ReferrlsComponent } from './referrals/referrls/referrls.component';
import {ExpertDetailsComponent} from './experts/expert-details/expert-details.component';
import {SubcategoryComponent} from './categorys/subcategory/subcategory.component';
import { AuthGuard } from '../guard/auth.guard';
import {CarousalComponent} from './carousal/carousal.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'admin',
    pathMatch:'full',
  },
  {
    path : 'admin',
    component : AdminComponent,
    children : [
      {
        path : 'dashboard',
        component : DashboardComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : '',
        component : DashboardComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]
      },
      {
        path : 'metadata',
        component : MetadataComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'language',
        component : LanguageComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'trash-languages',
        component : TrashLanguagesComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'category',
        component : CategoryComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'sub-category',
        component : SubcategoryComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'trash-categories',
        component : TrashCategoryComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'city',
        component : CityComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'trash-city',
        component : TrashCityComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'experts',
        component : ExpertsComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'experts-details/:id',
        component : ExpertDetailsComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'customer-reviews',
        component : CustomerReviewComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'live-session',
        component : LiveSessionsComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'offers',
        component : OfferPriceComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'admin-user',
        component : AdminUserComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'customer',
        component : CustomerComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'roles',
        component : RolesComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'permissions',
        component : PermissionsComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'referrals',
        component : ReferrlsComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
      {
        path : 'carousal',
        component : CarousalComponent,
        pathMatch : 'full',
        canActivate:[AuthGuard]

      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
