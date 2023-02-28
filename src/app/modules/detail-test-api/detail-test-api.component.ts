import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MobileService } from 'src/app/_services/mobile.service';

@Component({
  selector: 'app-detail-test-api',
  templateUrl: './detail-test-api.component.html',
  styleUrls: ['./detail-test-api.component.scss'],
})
export class DetailTestApiComponent implements OnInit {
  android: boolean = false;
  ios: boolean = false;
  notmobile: boolean = false;
  title = 'Test Funtion';
  token: any;

  actionSave: any;
  typeSave: any;

  dataBackDevice: any;
  dataMiniAppToken: any;
  dataRefreshMiniToken: any;
  dataLogout: any;
  dataUserInfo: any;
  dataContracts: any;
  dataAddress: any;
  dataShake: any;
  dataLocation: any;
  dataPhoto: any;
  dataContact: any;
  dataOcr1: any;
  dataOcr2: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone,
    private mobileService: MobileService
  ) {
    // @ts-ignore
    window.componentRef = {
      zone: this.zone,
      componentFn: (value: any) => this.resultBackDevice(value),
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
      componentFn: (value: any) => this.resultUser(value),
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
      componentFn: (value: any) => this.resultFetchData(value),
      component: this,
    };
    // @ts-ignore
    window.componentRef = {
      zone: this.zone,
      componentFn: (value: any) => this.resultSocket(value),
      component: this,
    };
    // @ts-ignore
    window.componentRef = {
      zone: this.zone,
      componentFn: (value: any) => this.resultPayment(value),
      component: this,
    };

    this.route.queryParamMap.subscribe(async (res) => {
      this.title = 'Test Funtion ' + res.get('title');
      this.token = sessionStorage.getItem('webkit-token-miniapp');
      console.log(this.token);
      this.dataMiniAppToken = this.token;
    });
  }

  ngOnInit(): void {
    this.testDT();
  }

  resultBackDevice(data: any): any {
    if (data) {
      let value = JSON.parse(data);
      if (value && value.action === 'backDevice') {
        this.router.navigate(['/test-app-permisstion']);
      }
    }
  }

  testDT(): any {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      if (/Android/i.test(navigator.userAgent)) {
        this.android = true;
      } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        this.ios = true;
      }
    } else {
      this.notmobile = true;
    }
  }

  urlPDF =
    'https://hdimedia.hdinsurance.com.vn/f/f023393209824b69a6645902573a3322';
  urlPNG = 'https://i.ibb.co/xzhzfHp/CatTuong.png';
  urlJPG = 'https://i.ibb.co/6P1zVBc/Cat-Tuong-07.jpg';
  urlXLSX =
    'https://download.thuthuatphanmem.vn/2019/06/08/file-excel-quan-ly-nhan-su-hop-dong_024249.xlsx';
  imageIMEI: any = '';
  loaded = false;

  handleInputChange(e: any): any {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.loaded = false;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any): any {
    const reader = e.target;
    console.log(reader.result);
    const temp = reader.result.split(',');
    this.imageIMEI = temp[1];
  }

  dataDeviceInfo: any;
  callFunctionApp(func: any, action: any, i?: any): any {
    this.actionSave = action;
    let temp = {};
    if (func === 'Authentication') {
      if (action === 'initMiniApp') {
        temp = {
          clientId: 'HiFPT',
        };
      } else if (action === 'logout') {
        temp = {
          clientId: 'abcd',
          token: this.token,
        };
      } else {
        temp = {
          token: this.token,
        };
      }
      const a = { action: action, data: temp };
      this.mobileService.callAuthentication(JSON.stringify(a));
    } else if (func === 'User') {
      if (action === 'userInfo') {
        temp = {
          token: this.token,
          options: ['name', 'phone', 'email', 'birthday'],
        };
      } else {
        temp = {
          token: this.token,
        };
      }
      const a = { action: action, data: temp };
      this.mobileService.callUser(JSON.stringify(a));
    } else if (func === 'Device') {
      if (action === 'ocr') {
        if (i === 1) {
          temp = {
            token: this.token,
            type: 'cmndAfter',
          };
          this.typeSave = 'cmndAfter';
        } else {
          temp = {
            token: this.token,
            type: 'cmndBefore',
          };
          this.typeSave = 'cmndBefore';
        }
      } else if (action === 'shake') {
        temp = { duration: 15, maxShake: 5, animationShake: 3 };
      } else {
        temp = {};
      }

      const a = { action: action, data: temp };
      this.mobileService.callDevice(JSON.stringify(a));
    } else if (func === 'Navigation') {
      if (action === 'goToUrl') {
        if (i === 1) {
          temp = {
            outApp: 1,
          };
        } else {
          temp = {
            outApp: 0,
          };
        }
      } else if (action === 'goToScreen') {
        temp = {
          screenKey: 'CONTRACT_HOME',
          data: null,
        };
      } else {
        temp = {};
      }
      const a = { action: action, data: temp };
      this.mobileService.callNavigation(JSON.stringify(a));
    } else if (func === 'Utilities') {
      if (action === 'shareApp') {
        temp = {
          appURL: 'abc',
        };
      } else if (action === 'shareContent') {
        if (i === 0) {
          temp = {
            type: 'url',
            content:
              'https://staging-hi.fpt.vn/shopping/vne/webview/team-information',
          };
        } else if (i === 1) {
          temp = {
            type: 'text',
            content: 'Hi FPT',
          };
        } else {
          temp = {
            type: 'image',
            content: this.imageIMEI,
          };
        }
      } else if (action === 'download') {
        let linkDownload = '';
        let typeDownload = '';
        if (i === 0) {
          linkDownload =
            'https://hdimedia.hdinsurance.com.vn/f/f023393209824b69a6645902573a3322';
          typeDownload = 'pdf';
        } else if (i === 1) {
          linkDownload =
            'https://download.thuthuatphanmem.vn/2019/06/08/file-excel-quan-ly-nhan-su-hop-dong_024249.xlsx';
          typeDownload = 'xlsx';
        } else if (i === 2) {
          linkDownload = 'https://i.ibb.co/xzhzfHp/CatTuong.png';
          typeDownload = 'png';
        } else if (i === 3) {
          linkDownload = 'https://i.ibb.co/6P1zVBc/Cat-Tuong-07.jpg';
          typeDownload = 'jpg';
        } else {
          linkDownload = '';
          typeDownload = '';
        }
        temp = {
          url: linkDownload,
          type: typeDownload,
        };
      }
      const a = { action: action, data: temp };
      this.mobileService.callUtilities(JSON.stringify(a));
    } else if (func === 'FetchData') {
      temp = {
        token: this.token,
      };

      const a = { action: action, data: temp };
      this.tempJS = a;
      this.mobileService.callFetchData(JSON.stringify(a));
    } else if (func === 'Payment') {
      temp = {
        token: this.token,
        data: {
          items: [{ amount: 50000, title: 'Hóa đơn dịch vụ Đồ gia dụng' }],
          promo_code: '',
          trans_id: 26513,
          service_type: 'FTG',
          trans_type: 'HOUSE_HOLD',
          total_amount: 50000,
        },
      };

      const a = { action: action, data: temp };
      this.tempJS = a;
      this.mobileService.callPaymentMiniApp(JSON.stringify(a));
    } else {
      console.log('call sai rồi!');
    }
  }

  tempJS: any;

  resultAuthentication(value: any): any {
    if (value) {
      if (this.actionSave === 'initMiniApp')
        this.dataMiniAppToken = JSON.parse(value);
      else if (this.actionSave === 'refreshMiniToken')
        this.dataRefreshMiniToken = JSON.parse(value);
      else if (this.actionSave === 'logout')
        this.dataLogout = JSON.parse(value);
      else {
        console.log('Sai rồi');
      }
    }
  }

  dataNotFormat: any;
  dataSocket: any;
  testAction: any;

  resultSocket(value: any): any {
    if (value) {
      alert(value);
      this.dataNotFormat = value;
      this.dataSocket = JSON.parse(value);
      this.testAction = this.dataSocket.data.action;
    }
  }

  resultUser(value: any): any {
    if (value) {
      if (this.actionSave === 'userInfo') this.dataUserInfo = JSON.parse(value);
      else if (this.actionSave === 'contracts')
        this.dataContracts = JSON.parse(value);
      else if (this.actionSave === 'address')
        this.dataAddress = JSON.parse(value);
      else {
        console.log('Sai rồi');
      }
    }
  }

  resultDevice(value: any): any {
    if (value) {
      if (this.actionSave === 'shake') this.dataShake = JSON.parse(value);
      else if (this.actionSave === 'location')
        this.dataLocation = JSON.parse(value);
      else if (this.actionSave === 'photo') this.dataPhoto = JSON.parse(value);
      else if (this.actionSave === 'contact')
        this.dataContact = JSON.parse(value);
      else if (this.actionSave === 'ocr') {
        if (this.typeSave === 'cmndAfter') this.dataOcr1 = JSON.parse(value);
        else this.dataOcr2 = JSON.parse(value);
      } else if (this.actionSave === 'deviceInfo') {
        this.dataDeviceInfo = JSON.parse(value);
      } else {
        const data = JSON.parse(value);
        if (data.action === 'viewAppear') {
          alert(data);
        }
        console.log('Sai rồi');
      }
    }
  }

  dataTokenHiFPT: any;

  resultFetchData(value: any): any {
    if (value) {
      this.dataTokenHiFPT = JSON.parse(value);
      // this.mobileService.getToken(this.dataTokenHiFPT.data.token).subscribe((res) => {
      //   if (res && res === 'ok') {
      //     window.location.href = "https://staging-hi.fpt.vn/shopping/vne/cart";
      //   }
      // });
    }
  }
  dataPayment: any;
  resultPayment(value: any): any {
    if (value) {
      this.dataPayment = JSON.parse(value);
    }
  }

  backPage() {
    history.back();
  }
}
