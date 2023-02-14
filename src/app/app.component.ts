import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  token = '';
  constructor(private zone: NgZone) {
    // @ts-ignore
    window.componentRef = {
      zone: this.zone,
      componentFn: (value: any) => this.resultAuthentication(value),
      component: this,
    };
  }

  resultAuthentication(value: any): any {
    const data = JSON.parse(value);
    console.log(data);
    if (data) {
      sessionStorage.setItem('webkit-token-miniapp', data.data.token);
      this.token = data.data.token;
    }
  }
}
