import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    pathMatch: 'prefix',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RmaRoutingModule {}
