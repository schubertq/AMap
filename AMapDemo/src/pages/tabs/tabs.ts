import { Component } from '@angular/core';

import {MapHomeCtrl} from "../map/map-home";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = MapHomeCtrl;

  constructor() {

  }
}
