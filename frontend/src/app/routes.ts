import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ContestPageComponent } from './contestPages/contest-page/contest-page.component';
import {AdminPanelComponent} from "./admin/admin-panel/admin-panel.component";
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './auth-guard';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CreateContestPageComponent } from './create-contest-page/create-contest-page.component';

export const routes: Routes = [
  {
    path:'login',
    component:LoginPageComponent,
    title:'You ready?'
  },
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Home page'
  },
  {
    path: 'contest/:id',
    component: ContestPageComponent,
    title: 'Contest'
  },
  {
    path:'admin_panel',
    component:AdminPanelComponent,
    title:'Admin Panel'
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
    // ,canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Home page'
  },
  {
    path: 'contest/:id',
    component: ContestPageComponent,
    title: 'Contest'
  },
  {
    path: 'profile/:id',
    component: ProfilePageComponent,
    title: 'Profile'
  },
  {
    path: "contest-creation",
    component: CreateContestPageComponent,
    title: 'Create contest'
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];
