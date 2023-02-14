import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SafeResourceUrlPipe } from './_pipe/safe-resource-url.pipe';

@NgModule({
  declarations: [AppComponent, SafeResourceUrlPipe],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
