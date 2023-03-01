import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import { sha256 } from 'js-sha256';

@Injectable({
  providedIn: 'root',
})
export class MobileService {
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();
  private emitPackageSubject = new BehaviorSubject<any>({});
  packageObservable$ = this.emitPackageSubject.asObservable();
  private emitPromotionSubject = new BehaviorSubject<any>({});
  promotionObservable$ = this.emitPromotionSubject.asObservable();
  private emitInputPromotionSubject = new BehaviorSubject<any>({});
  promotionInputObservable$ = this.emitInputPromotionSubject.asObservable();
  private emitAddressSubject = new BehaviorSubject<any>({});
  addressObservable$ = this.emitAddressSubject.asObservable();
  private emitVoucherSubject = new BehaviorSubject<any>({});
  voucherObservable$ = this.emitVoucherSubject.asObservable();
  private emitOnmeetingSubject = new BehaviorSubject<any>({});
  onmeetingObservable$ = this.emitOnmeetingSubject.asObservable();
  private emitVideoSubject = new BehaviorSubject<any>({});
  videoObservable$ = this.emitVideoSubject.asObservable();
  private emitWomenDaySubject = new BehaviorSubject<any>({});
  womenDayObservable$ = this.emitWomenDaySubject.asObservable();
  private emitWomenDaySubject2 = new BehaviorSubject<any>({});
  womenDayObservable2$ = this.emitWomenDaySubject2.asObservable();
  private emitWomenDaySubject3 = new BehaviorSubject<any>({});
  womenDayObservable3$ = this.emitWomenDaySubject3.asObservable();
  private emitMarathonSubject = new BehaviorSubject<any>({});
  marathonObservable$ = this.emitMarathonSubject.asObservable();
  private emitLuxInternetSubject = new BehaviorSubject<any>({});
  luxInternetObservable$ = this.emitLuxInternetSubject.asObservable();
  private emitLoyaltySubject = new BehaviorSubject<any>({});
  fptLoyaltyObservable$ = this.emitLoyaltySubject.asObservable();

  constructor() {}

  packageMessage(data: any): any {
    this.emitPackageSubject.next(data);
  }

  emitChange(): any {
    this.emitChangeSource.next('change');
  }

  emitPromotion(data: any): any {
    this.emitPromotionSubject.next(data);
  }

  emitInputPromotion(data: any): any {
    this.emitInputPromotionSubject.next(data);
  }

  emitVideo(data: any): any {
    this.emitVideoSubject.next(data);
  }

  emitAddress(data: any): any {
    this.emitAddressSubject.next(data);
  }

  emitVoucher(data: any): any {
    this.emitVoucherSubject.next(data);
  }

  emitOnmeeting(data: any): any {
    this.emitOnmeetingSubject.next(data);
  }

  emitWomenDay(data: any): any {
    this.emitWomenDaySubject.next(data);
  }

  emitWomenDay2(data: any): any {
    this.emitWomenDaySubject2.next(data);
  }

  emitWomenDay3(data: any): any {
    this.emitWomenDaySubject3.next(data);
  }

  emitMarathon(data: any): any {
    this.emitMarathonSubject.next(data);
  }

  emitLux(data: any): any {
    this.emitLuxInternetSubject.next(data);
  }

  emitLoyalty(data: any): any {
    this.emitLoyaltySubject.next(data);
  }

  getToken(): any {}

  getInfoUser(): any {
    if (Cookie.get('webkit_info')) {
      return JSON.parse(
        decodeURIComponent(escape(atob(Cookie.get('webkit_info'))))
      );
    } else {
      return null;
    }
  }

  checkSum(value: any): any {
    const a = value;
    const hash = sha256.create();
    hash.update(a);
    hash.hex();
    return hash.hex();
  }

  checkToken(): any {
    return Cookie.check('webkit_token');
  }

  getMobileFcToken(): any {
    return Cookie.get('webkit_token');
  }

  callToken(): any {
    console.log({ action: 'getToken' });
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.AndroidBridge.callbackToApp('{"action" : "getToken"}');
      // @ts-ignore
    } else if (window.webkit && window.webkit.messageHandlers) {
      // @ts-ignore
      window.webkit.messageHandlers.callbackToApp.postMessage(
        '{"action" : "getToken"}'
      );
    }
  }

  callAppAddress(): any {
    const dataPost = { action: 'location', data: null };
    console.log(dataPost);
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.AndroidBridge.device(JSON.stringify(dataPost));
      // @ts-ignore
    } else if (window.webkit && window.webkit.messageHandlers) {
      // @ts-ignore
      window.webkit.messageHandlers.device.postMessage(
        JSON.stringify(dataPost)
      );
    }
  }

  callTokenMiniApp(clientId: string): any {
    const dataPost = {
      action: 'initMiniApp',
      data: { clientId },
    };
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.AndroidBridge.authentication(JSON.stringify(dataPost));
      // @ts-ignore
    } else if (window.webkit && window.webkit.messageHandlers) {
      // @ts-ignore
      window.webkit.messageHandlers.authentication.postMessage(
        JSON.stringify(dataPost)
      );
    }
  }

  contractID(): any {
    const a = { action: 'contractInfo' };
    this.callAppFunction(JSON.stringify(a));
  }

  callAppFunction(str: any): any {
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.AndroidBridge.callbackToApp(str);
      // @ts-ignore
    } else if (window.webkit && window.webkit.messageHandlers) {
      // @ts-ignore
      window.webkit.messageHandlers.callbackToApp.postMessage(str);
    }
  }

  sharedAppFunction(): any {
    const a = {
      action: 'shareApp',
      data: '',
    };
    // @ts-ignore
    if (window.AndroidBridge) {
      a.data =
        'https://play.google.com/store/apps/details?id=com.rad.hifpt&hl=vi';
      // @ts-ignore
      window.AndroidBridge.callbackToApp(JSON.stringify(a));
      // @ts-ignore
    } else if (window.webkit && window.webkit.messageHandlers) {
      a.data = 'https://apps.apple.com/vn/app/hi-fpt/id1144417173';
      // @ts-ignore
      window.webkit.messageHandlers.callbackToApp.postMessage(
        JSON.stringify(a)
      );
    }
  }

  installingApp(): any {
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.location.href =
        'https://play.google.com/store/apps/details?id=com.rad.hifpt&hl=vi';
      // @ts-ignore
    } else if (window.webkit && window.webkit.messageHandlers) {
      // @ts-ignore
      window.location.href =
        'https://itunes.apple.com/vn/app/hi-fpt/id1144417173?l=vi&mt=8';
    }
  }

  directionApp(p: any): any {
    if (p.mission_type === 'NAVIGATE_SCREEN') {
      this.directionCallApp(p.mission_action);
    } else if (p.mission_type === 'SHARE') {
      this.sharedAppFunction();
    } else if (p.mission_type === 'GO_HOME') {
      this.goHome();
    }
  }

  directionCallApp(str: any): any {
    const a = {
      action: 'callScreen',
      data: null,
      actionType: 'go_to_screen',
      title: '',
      dataAction: str,
    };
    this.callAppFunction(JSON.stringify(a));
  }

  directionCallApp2(str: any): any {
    const a = {
      action: 'callScreenFromHome',
      data: null,
      actionType: 'go_to_screen',
      title: '',
      dataAction: str,
    };
    this.callAppFunction(JSON.stringify(a));
  }

  directionCallAppWithLink(str: any): any {
    const a = {
      action: 'callScreen',
      data: null,
      actionType: 'open_url_in_app_with_access_token',
      title: '',
      dataAction: str,
    };
    this.callAppFunction(JSON.stringify(a));
  }

  expireTokenHifpt(): any {
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.AndroidBridge.callbackToApp('{"action" : "tokenExpire"}');
      // @ts-ignore
    } else if (window.webkit.messageHandlers) {
      // @ts-ignore
      window.webkit.messageHandlers.callbackToApp.postMessage(
        '{"action" : "tokenExpire"}'
      );
    }
  }

  callCamera(): any {
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.AndroidBridge.callbackToApp('{"action" : "callCamera"}');
      // @ts-ignore
    } else if (window.webkit.messageHandlers) {
      // @ts-ignore
      window.webkit.messageHandlers.callbackToApp.postMessage(
        '{"action" : "callCamera"}'
      );
    }
  }

  goHome(): any {
    Cookie.delete('webkit_token');
    sessionStorage.clear();
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.AndroidBridge.surveyAction('{"action" : "backHome"}');
      // @ts-ignore
    } else if (window.webkit.messageHandlers) {
      // @ts-ignore
      window.webkit.messageHandlers.surveyAction.postMessage(
        '{"action" : "backHome"}'
      );
    }
  }

  goBackHome(): any {
    Cookie.delete('webkit_token');
    sessionStorage.clear();
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.AndroidBridge.callbackToApp('{"action" : "Home"}');
      // @ts-ignore
    } else if (window.webkit.messageHandlers) {
      // @ts-ignore
      window.webkit.messageHandlers.callbackToApp.postMessage(
        '{"action" : "Home"}'
      );
    }
  }

  goHomeHiFPT(): any {
    localStorage.clear();
    sessionStorage.clear();
    Cookie.delete('webkit_token');
    const dataPost = { action: 'goBack', data: null };
    console.log(dataPost);
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.AndroidBridge.navigation(JSON.stringify(dataPost));
      // @ts-ignore
    } else if (window.webkit && window.webkit.messageHandlers) {
      // @ts-ignore
      window.webkit.messageHandlers.navigation.postMessage(
        JSON.stringify(dataPost)
      );
    }
  }

  convertPrice(p: any): any {
    return p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  callPaymentWebkit(data?: any): any {
    if (data) {
      console.log(data);
      const content = data;
      // @ts-ignore
      if (window.AndroidBridge) {
        // @ts-ignore
        window.AndroidBridge.callPaymentWebkit(JSON.stringify(content));
        // @ts-ignore
      } else if (window.webkit && window.webkit.messageHandlers) {
        // @ts-ignore
        window.webkit.messageHandlers.callPaymentWebkit.postMessage(
          JSON.stringify(content)
        );
      }
    }
  }

  callDownloadToApp(data?: any): any {
    const content = data;
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.AndroidBridge.callDownloadToApp(JSON.stringify(content));
      // @ts-ignore
    } else if (window.webkit && window.webkit.messageHandlers) {
      // @ts-ignore
      window.webkit.messageHandlers.callDownloadToApp.postMessage(
        JSON.stringify(content)
      );
    }
  }

  //New Call Function App
  callAuthentication(str: any): any {
    console.log(str);
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.AndroidBridge.authentication(str);
      // @ts-ignore
    } else if (window.webkit && window.webkit.messageHandlers) {
      // @ts-ignore
      window.webkit.messageHandlers.authentication.postMessage(str);
    }
  }

  callUser(str: any): any {
    console.log(str);
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.AndroidBridge.user(str);
      // @ts-ignore
    } else if (window.webkit && window.webkit.messageHandlers) {
      // @ts-ignore
      window.webkit.messageHandlers.user.postMessage(str);
    }
  }

  callDevice(str: any): any {
    console.log(str);
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.AndroidBridge.device(str);
      // @ts-ignore
    } else if (window.webkit && window.webkit.messageHandlers) {
      // @ts-ignore
      window.webkit.messageHandlers.device.postMessage(str);
    }
  }

  callNavigation(str: any): any {
    console.log(str);
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.AndroidBridge.navigation(str);
      // @ts-ignore
    } else if (window.webkit && window.webkit.messageHandlers) {
      // @ts-ignore
      window.webkit.messageHandlers.navigation.postMessage(str);
    }
  }

  callUtilities(str: any): any {
    console.log(str);
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.AndroidBridge.utilities(str);
      // @ts-ignore
    } else if (window.webkit && window.webkit.messageHandlers) {
      // @ts-ignore
      window.webkit.messageHandlers.utilities.postMessage(str);
    }
  }

  callFetchData(str: any): any {
    console.log(str);
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.AndroidBridge.fetchData(str);
      // @ts-ignore
    } else if (window.webkit && window.webkit.messageHandlers) {
      // @ts-ignore
      window.webkit.messageHandlers.fetchData.postMessage(str);
    }
  }

  callPaymentMiniApp(str: any): any {
    console.log(str);
    // @ts-ignore
    if (window.AndroidBridge) {
      // @ts-ignore
      window.AndroidBridge.payment(str);
      // @ts-ignore
    } else if (window.webkit && window.webkit.messageHandlers) {
      // @ts-ignore
      window.webkit.messageHandlers.payment.postMessage(str);
    }
  }
}
