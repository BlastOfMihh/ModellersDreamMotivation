import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ContestPageComponent } from './contestPages/contest-page/contest-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

export const routes: Routes = [
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
    // JUST FOR TESTS
    {
        path: 'contest',
        component: ContestPageComponent,
        title: 'Contest'
    },
    {
        path: 'profile/:id',
        component: ProfilePageComponent,
        title: 'Profile'
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
];