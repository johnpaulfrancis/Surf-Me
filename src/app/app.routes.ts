import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UnderConstructionComponent } from './MessagePages/under-construction/under-construction.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '', component:HomeComponent
    },
    {
        path: 'login', component:LoginComponent
    },
    {
        path:'user-dashboard', component:DashboardComponent, canActivate: [authGuard]
    },
    {
        path:'under-construction', component: UnderConstructionComponent
    }
];