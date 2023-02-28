import { Component, NgZone, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MobileService } from 'src/app/_services/mobile.service';

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.scss'],
})
export class TestApiComponent implements OnInit {
  typeBack = '';
  tokenHifpt: any;
  isLogin: any;
  dataGet: any;
  dataGet2: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone,
    private metaTagService: Meta,
    private mobileService: MobileService
  ) {
    this.route.queryParamMap.subscribe((res) => {
      this.tokenHifpt = res.get('test');
    });
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
  }

  callAPItoToken(): any {
    window.location.href =
      'https://staging-hi.fpt.vn/shopping/vne/test-hi-miniapp';
  }

  callToken(): any {
    this.mobileService.callToken();
  }

  callDeviceId(): any {
    this.mobileService.callAppFunction('{action: "affiliate_marketing"}');
  }

  resultDevice(value: any): any {
    if (value) {
      const data = JSON.parse(value);
      if (data.action === 'viewAppear') {
        alert(data);
      }
    }
  }

  initServices(value: any): any {
    this.tokenHifpt = value;
  }

  resultAuthentication(value: any): any {
    const data = JSON.parse(value);
    console.log(data);
    if (data) {
      sessionStorage.setItem('webkit-token-miniapp', data.data.token);
    }

    // this.mobileService.getToken(this.tokenHifpt).subscribe((res) => {
    //   if (res && res === 'ok') {
    //     this.isLogin = true;
    //     this.refreshData();
    //   } else {
    //     this.isLogin = false;
    //   }
    // });
  }

  refreshData(): any {}

  ngOnInit(): void {
    this.metaTagService.updateTag({
      property: 'og:title',
      content: 'Hi FPT Telecom Test App 2',
    });
    this.metaTagService.updateTag({
      property: 'og:image',
      content:
        'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/ecom/billing/remind/template/template_4.png',
    });
    this.metaTagService.updateTag({
      property: 'og:description',
      content: 'Webcome HiFPT Test App 2',
    });
    if (this.tokenHifpt) {
      this.initServices(this.tokenHifpt);
    }
  }

  goto(str: any) {
    if (str === 'link') {
      window.location.href =
        'https://staging-hi.fpt.vn/shopping/vne/miniapp/home';
    } else if (str === 'link-open') {
      window.location.href = 'https://hifpt-mini-app.web.app/';
    } else {
      this.router.navigate(['/detail'], {
        queryParams: { title: str },
      });
    }
  }

  backPage() {
    history.back();
  }
}
