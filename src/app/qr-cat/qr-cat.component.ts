import { Component } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-qr-cat',
  templateUrl: './qr-cat.component.html',
  styleUrls: ['./qr-cat.component.scss'],
})
export class QrCatComponent {

  public qrdata: string = '123123123';
  public qrCodeDownloadLink: SafeUrl = "";
  
  constructor () {
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
}
