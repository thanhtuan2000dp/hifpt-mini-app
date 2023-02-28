import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SafeResourceUrlPipe } from './_pipe/safe-resource-url.pipe';
import { TestApiComponent } from './modules/test-api/test-api.component';
import { DetailTestApiComponent } from './modules/detail-test-api/detail-test-api.component';

@NgModule({
  declarations: [AppComponent, SafeResourceUrlPipe, TestApiComponent, DetailTestApiComponent],
  imports: [BrowserModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
