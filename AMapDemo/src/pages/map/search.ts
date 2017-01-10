import { Component, ViewChild, NgZone } from '@angular/core';
import {
  ViewController, AlertController, NavController, ToastController, Searchbar,
  LoadingController
} from 'ionic-angular';
import { MapService } from './map.service';
import {BaseCtrl} from "../base-ctrl";

@Component({
  templateUrl: 'search.html'
})

export class SearchCtrl extends BaseCtrl {
  @ViewChild('searchbar') searchbar: Searchbar;

  places: Array<any> = [];
  private addressElement: HTMLInputElement = null;

  constructor(private navCtrl: NavController,
              private mapService: MapService,
              private zone: NgZone,
              protected alertCtrl: AlertController,
              protected toastCtrl: ToastController,
              protected loadingCtrl: LoadingController,
              private viewCtrl: ViewController) {
    super(alertCtrl, toastCtrl, loadingCtrl);
  }

  ionViewDidEnter() {
    this.searchbar.setFocus();
  }

  dismiss() {
    this.navCtrl.popToRoot();
  }

  /***
   * Place item has been selected
   */
  searchPlace(place: any) {
    this.mapService.searchPlace(place).subscribe((result) => {
      console.log("searchPlace callback success!");
      console.log(result);
      if ("no_data" == result) {
        this.displayMessageToast();
      } else {
        this.dismiss();
      }
    }, (error) => {
      this.displayMessageToast("网络不给力,请稍后重试!");
      console.error(error);
    });
  }

  autoComplete(event) {
    console.log(event.target.value);
    this.mapService.autoComplete(event.target.value).subscribe((result) => {
      console.log("autoComplete callback success!");
      console.log(result);
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
