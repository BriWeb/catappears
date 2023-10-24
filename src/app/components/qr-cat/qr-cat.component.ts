import { Component, Input} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-qr-cat',
  templateUrl: './qr-cat.component.html',
  styleUrls: ['./qr-cat.component.scss'],
})
export class QrCatComponent{

  @Input() qrcode: string = '';
  @Input() qrname: string = ''; 
  
  public qrCodeDownloadLink: SafeUrl = "";
  
  constructor () {
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

}
