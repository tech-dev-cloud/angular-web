import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `<button (click)="onClick()"><img src="{{src}}" /> {{text}}</button>`,
  styles: [`
  button {
    background-color: #c92223;
    border: 0;
    color: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 7px;
    margin-top: 0px;
}
button:hover{
  opacity:.8;
  outline:none;
  transition: .5s;
}

`]
})
export class ButtonComponent implements OnInit {
  @Input() src: string;
  @Input() text: string;
  @Output() clickEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.clickEvent.emit();
  }


}
