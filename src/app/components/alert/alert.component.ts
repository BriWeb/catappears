import { Component, EventEmitter, Input, Output,  } from '@angular/core';

@Component({
  selector: 'AlertComponent',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent{

  constructor() { }

  @Input() error: string = '';
  @Output() setError = new EventEmitter<string>();
  
  closeAlert(){
    this.error = '';
    this.setError.emit(this.error);
  }

}
