import { Component, NgZone } from '@angular/core';
import { MobileService } from './_services/mobile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tokenHifpt = '';
  userInfo: any;
  constructor(private zone: NgZone, private mobileService: MobileService) {
    this.mobileService.callTokenMiniApp();
    // @ts-ignore
    window.componentRef = {
      zone: this.zone,
      componentFn: (value: any) => this.initServices(value),
      component: this,
    };
    // @ts-ignore
    window.componentRef = {
      zone: this.zone,
      componentFn: (value: any) => this.resultAuthentication(value),
      component: this,
    };
    // @ts-ignore
    window.componentRef = {
      zone: this.zone,
      componentFn: (value: any) => this.resultDevice(value),
      component: this,
    };
    // @ts-ignore
    window.componentRef = {
      zone: this.zone,
      componentFn: (value: any) => this.resultUser(value),
      component: this,
    };
  }

  resultAuthentication(value: any): any {
    const data = JSON.parse(value);
    console.log(data);
    if (data) {
      sessionStorage.setItem('webkit-token-miniapp', data.data.token);
      this.tokenHifpt = 'auth' + data.data.token;
    }
  }

  initServices(value: any): any {
    this.tokenHifpt = 'init' + value;
  }

  resultDevice(value: any): any {
    if (value) {
      const data = JSON.parse(value);
      if (data.action === 'viewAppear') {
        window.alert(`Hệ thống thông báo: ${data}`);
      }
    }
  }

  resultUser(value: any): any {
    if (value) {
      const data = JSON.parse(value);
      this.userInfo = data;
    }
  }

  getUser() {
    this.mobileService.callUser(
      JSON.stringify({
        action: 'userInfo',
        data: {
          token: this.tokenHifpt,
          options: ['name', 'phone', 'email', 'birthday'],
        },
      })
    );
  }
}
