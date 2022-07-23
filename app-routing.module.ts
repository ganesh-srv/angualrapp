import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyCardComponent } from './shared/property-card/property-card.component';



const routes: Routes = [
  {
    path: 'properties',
    loadChildren: () => import('./property-search/property-search.module').then(m => m.PropertySearchModule),
  },
  {
    path: 'card',
    component: PropertyCardComponent
  },
  {
    path: '**',
    redirectTo: 'properties'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
