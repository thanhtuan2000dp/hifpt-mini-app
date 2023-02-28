import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestApiComponent } from './modules/test-api/test-api.component';
import { DetailTestApiComponent } from './modules/detail-test-api/detail-test-api.component';

const routes: Routes = [
  { path: '', component: TestApiComponent },
  { path: 'detail', component: DetailTestApiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
