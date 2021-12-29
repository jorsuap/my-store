import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { HomeComponent } from './pages/home/home.component';


import { MycartComponent } from './pages/mycart/mycart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { ProductDatailComponent } from './pages/product-datail/product-datail.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '../guards/auth.guard';
import { ExitGuard } from '../guards/exit.guard';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'',
        redirectTo:'/home',
        pathMatch:'full'
      },
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'category',//recibe un parametro por url
        loadChildren:()=>import('./pages/category/category.module').then(m=>m.CategoryModule),
        data:{
          preload:true,
        }
      },
      {
        path:'product/:id',//recibe un parametro por url
        component:ProductDatailComponent
      },
      {
        path:'my-cart',
        component:MycartComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'register',
        canDeactivate:[ExitGuard],//guardian para no permitir salir
        component:RegisterComponent
      },
      {
        path:'recovery',
        component:RecoveryComponent
      },
      {
        path:'profile',
        canActivate:[AuthGuard],
        component:ProfileComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
