import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import {MapHomeCtrl} from "../pages/map/map-home";
import {SearchCtrl} from "../pages/map/search";
import {NearbyCtrl} from "../pages/map/nearby";
import {MapCtrl} from "../pages/map/map";
import {MapService} from "../pages/map/map.service";
// mainstream added
@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MapHomeCtrl,
    SearchCtrl,
    NearbyCtrl,
    MapCtrl,
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios',
      tabsHideOnSubPages: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MapHomeCtrl,
    SearchCtrl,
    NearbyCtrl,
    MapCtrl
  ],
  providers: [MapService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
