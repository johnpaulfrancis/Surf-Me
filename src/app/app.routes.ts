import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UnderConstructionComponent } from './MessagePages/under-construction/under-construction.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { CountryDetailsComponent } from './user/country-details/country-details.component';
import { TrackComponent } from './spotify/track/track.component';
import { SpotifyHomeComponent } from './spotify/spotify-home/spotify-home.component';

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
        path: 'spotify/home', component:SpotifyHomeComponent, canActivate: [authGuard]
    },
    {
        path: 'spotify/track', component:TrackComponent, canActivate: [authGuard]
    },
    {
        path: 'country-search', component:CountryDetailsComponent, canActivate: [authGuard]
    },
    {
        path:'under-construction', component: UnderConstructionComponent
    }
];