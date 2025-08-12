import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UnderConstructionComponent } from './MessagePages/under-construction/under-construction.component';

export const routes: Routes = [
    {
        path: 'login', component:LoginComponent
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path:'under-construction', component: UnderConstructionComponent
    }
];