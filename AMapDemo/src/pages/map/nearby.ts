import {Component, ViewChild} from '@angular/core';

import {
  NavController, AlertController, ToastController, Searchbar, LoadingController
} from 'ionic-angular';

import {MapService} from "../map/map.service";
import {BaseCtrl} from "../base-ctrl";

@Component({
  templateUrl: 'nearby.html'
})
export class NearbyCtrl extends BaseCtrl {
  @ViewChild('searchbar') searchbar: Searchbar;
  openLinkOptions = "location=no,closebuttoncaption=返回";

  places: Array<any> = [];
  showContainer: boolean = true;

  constructor(private navCtrl: NavController,
              protected alertCtrl: AlertController,
              private mapService: MapService,
              protected toastCtrl: ToastController,
              protected loadingCtrl: LoadingController) {
    super(alertCtrl, toastCtrl, loadingCtrl);
  }

  autoComplete(event) {
    if (event.target.value.length == 0) {
      this.showContainer = true;
      this.places = [];
    } else {
      this.mapService.autoComplete(event.target.value).subscribe((result) => {
        this.showContainer = false;
        console.log("autoComplete callback success!");
        if ("no_data" == result) {
          this.displayMessageToast("未找到相关结果,请重新输入!");
        } else {
          this.places = result;
        }
      }, (error) => {
        this.displayMessageToast("网络不给力,请稍后重试!");
        console.error(error);
      });
    }
  }

  /***
   * Place item has been selected
   */
  searchPlace(place: any) {
    this.displayLoading();
    this.mapService.searchPlace(place).subscribe((result) => {
      this.loading.dismiss();
      console.log("searchPlace callback success!");
      if ("no_data" == result) {
        this.displayMessageToast();
      } else {
        this.dismiss();
      }
    }, (error) => {
      this.loading.dismiss();
      this.displayMessageToast("网络不给力,请稍后重试!");
      console.error(error);
    });
  }

  searchType(type: string, radius: number = 3000) {
    this.displayLoading();
    this.mapService.searchNearby(type, radius).subscribe((result) => {
      this.loading.dismiss();
      console.log("searchNearby callback success!");
      if ("no_data" == result) {
        this.displayMessageToast();
      } else {
        this.navCtrl.pop();
      }
    }, (error) => {
      this.loading.dismiss();
      this.displayMessageToast("网络不给力,请稍后重试!");
      console.error(error);
    });
  }

  dismiss() {
    this.navCtrl.pop();
  }
}
