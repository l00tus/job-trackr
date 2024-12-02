import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'home', component: HomeComponent},
    { path: 'main', component: MainComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'analytics', component: AnalyticsComponent },
            { path: 'calendar', component: CalendarComponent },
            { path: 'about', component: AboutComponent},
            { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        ],
    },
    { path: '**', redirectTo: '/home', pathMatch: 'full'},
];