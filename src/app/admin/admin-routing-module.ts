import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { AdminLayoutComponent} from './layout/admin-layout/admin-layout';
import { ProductsComponent } from './products/products';
import { OrdersComponent } from './orders/orders';
import { UsersComponent } from './users/users';
import { CategoriesComponent } from './categories/categories';
export const ADMIN_ROUTES: Routes = [

  // ✅ login page (without layout)
  {
    path: 'login',
    component: Login
  },

  // ✅ layout routes
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'products',
        component: ProductsComponent
      }
      ,
      { path: 'orders',
        component: OrdersComponent
      },
      { path: 'users',
        component: UsersComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      }
    ]
  }

];