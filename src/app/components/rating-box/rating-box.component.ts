import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-box',
  templateUrl: './rating-box.component.html',
  styleUrls: ['./rating-box.component.scss']
})
export class RatingBoxComponent implements OnInit {
  @Input() rating: number;
  constructor() { }

  ngOnInit(): void {
  }
  loopArr(type: 'full' | 'half' | 'empty') {
    debugger
    switch (type) {
      case 'full':
        return [].constructor(Math.ceil(this.rating));
      case 'half':
        return 0;
      case 'empty':
        debugger
        return [].constructor(5 - Math.ceil(this.rating));
    }
  }
}
