import { Component, OnInit } from '@angular/core';
import {LoaderService} from '../../core/services/loader.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  show:boolean;
  constructor(private loaderService:LoaderService) { }

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe(res=>{
      this.show=res;
    })
  }

}
