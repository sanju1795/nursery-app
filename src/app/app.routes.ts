import { Routes } from '@angular/router';
import { HomeComponent } from './user/pages/home/home';
import { LoginComponent } from './user/pages/login/login';
import { PlantsComponent } from './user/pages/plants/plants';
import { UserCategoriesComponent } from './user/pages/user-categories/user-categories';
import { PlantDetailsComponent } from './user/pages/plant-details/plant-details';
import { BlogComponent } from './user/pages/blog/blog';
import { BlogDetailsComponent } from './user/pages/blog-details/blog-details';
import { OrderSuccessComponent } from './user/pages/order-success/order-success';
import { CartComponent } from './user/pages/cart/cart';
import { ProfileComponent } from './user/pages/profile/profile';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';

export const routes: Routes = [

  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin-module')
        .then(m => m.ADMIN_MODULE)
  },

  // default app route
  {
    path: 'admin/login',
    redirectTo: 'admin/login',
    pathMatch: 'full'
  },
 
   {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: HomeComponent }, 
      { path: 'blog', component: BlogComponent },
      { path: 'cart', component: CartComponent },
      { path: 'plant/:id', component: PlantDetailsComponent },
      { path: 'blog/:id', component: BlogDetailsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'order-success', component: OrderSuccessComponent },
      { path: 'login', component: LoginComponent },
      { path: 'plants', component: PlantsComponent },
      { path: 'user-categories', component: UserCategoriesComponent }

    ]
  }
];

