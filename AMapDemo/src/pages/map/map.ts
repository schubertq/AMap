import {Component, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { MapService } from './map.service';

declare var AMap;

@Component({
  selector: 'amap',
  // note:解决鼠标单击右键变左键
  template: `<div #amap id="gdmap" data-tap-disabled="true"></div>`
})

export class MapCtrl implements AfterViewInit {
  @Output() onMapReady = new EventEmitter();
  // @Output() onMapIdle = new EventEmitter();
  // @Output() onCenterChanged = new EventEmitter();
  // @Output() onDragStart = new EventEmitter();

  @ViewChild('amap') mapCanvas: ElementRef;
  private map: any = null;

  constructor(private mapService: MapService) {
  }

  ngAfterViewInit() {
    const mapElem = this.mapCanvas.nativeElement;
    console.log(mapElem);
    return this.mapService.createMap(mapElem).then((map) => {
      console.log("createMap success");
      this.map = map;
      this.bindMapEvents(mapElem);
    });
    // this.mapService.displayCurrentPosition(mapElem).subscribe(data => {
    //   console.error(data);
    // }, error => {
    //   console.error(error);
    // });
  }

  private bindMapEvents(mapEl: HTMLElement): void {
    // // Stop the side bar from dragging when mousedown/tapdown on the map
    // AMap.event.addDomListener(mapEl, 'mousedown', (e) => {
    //   e.preventDefault();
    // });
    console.log("bindMapEvents");

    AMap.event.addListenerOnce(this.map, 'complete', () => {
      console.log("地图加载完毕");
      this.onMapReady.emit({
        value: this.map
      });
    });

    // AMap.event.addListenerOnce(this.map, 'center_changed', () => {
    //   this.onCenterChanged.emit({
    //     value: this.map
    //   });
    // });
    //
    // AMap.event.addListener(this.map, 'idle', () => {
    //   this.onMapIdle.emit({
    //     value: this.map
    //   });
    // });
    //
    // AMap.event.addListener(this.map, 'dragstart', () => {
    //   this.onDragStart.emit({
    //     value: this.map
    //   });
    // });
  }
}
