import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _isMobileResolution: boolean;
  constructor() {
    if (window.innerWidth < 768) {
      this._isMobileResolution = true;
    } else {
      this._isMobileResolution = false;
    }
  }
  public set isMobileResolution(val:boolean) {
    this._isMobileResolution=val;
  }
  public get isMobileResolution(): boolean {
    return this._isMobileResolution;
  }
}
