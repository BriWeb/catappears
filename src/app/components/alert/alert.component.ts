import { Component, EventEmitter, Input, Output,  } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent{

  constructor() { }

  @Input() error: string = '';
  @Output() setError = new EventEmitter<string>();
  
  closeAlert(){
    this.error = '';
    console.log('Error desde alert: ', this.error);
    this.setError.emit(this.error);
  }

}
