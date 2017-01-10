import {Component} from '@angular/core';
import {NavController, Platform, LoadingController, Loading, AlertController} from 'ionic-angular';
import {MapService} from "./map.service";
import {Observable} from 'rxjs/observable';
import {NearbyCtrl} from "./nearby";

@Component({
  templateUrl: 'map-home.html'
})
export class MapHomeCtrl {
  loader:Loading;
  private localized: boolean = false;

  constructor(public loadingCtrl:LoadingController,
              private navCtrl: NavController,
              private platform:Platform,
              private mapService: MapService,
              protected alertCtrl: AlertController) {
  }

  ngOnInit() {
    const loader = this.loadingCtrl.create({
      content: "正在加载中...",
      spinner: 'hide',
      showBackdrop: true
    });
    this.loader = loader;
    loader.present();
  }

  /***
   * 地图加载完毕
   */
  onMapReady() {
    console.log("onMapReady");
    this.platform.ready().then(() => {
      this.locate().subscribe(() => {
        console.log("定位成功");
        const mapElement: Element = this.mapService.mapElement;
        if (mapElement) {
          console.log("显示当前位置");
          mapElement.classList.add('show-map');
        }
      }, error => {
        console.log(error);
      });
    });
  }

  /**
   * 获取当前定位
   */
  private locate(): Observable<any> {
    return new Observable((sub:any) => {
      this.mapService.displayCurrentPosition().subscribe(data => {
        console.log("displayCurrentPosition success");
        this.loader.dismiss();
        this.localized = true;
        // Vibrate the device for a second
        // Vibration.vibrate(1000);
        sub.next(data);
        sub.complete();
      }, error => {
        sub.error(error);
        this.loader.dismiss();
        this.alertNoGps();
      });
    });
  }

  /**
   * 出错提示
   */
  private alertNoGps() {
    const alert = this.alertCtrl.create({
      title: 'OFBH5',
      subTitle: '定位服务不可用,请到设置里面开启!',
      enableBackdropDismiss: false,
      buttons: [{
        text: '好的',
        handler: () => {
        }
      }]
    });
    alert.present();
  }

  /**
   * 跳转至附近控制器
   */
  goToNearbyCtrl() {
    this.navCtrl.push(NearbyCtrl);
  }
}
