import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-scaner',
  templateUrl: './scaner.component.html',
  styleUrls: ['./scaner.component.scss'],
})
export class ScanerComponent  implements OnInit {

  constructor() { }

  async checkPermissionAndStartScan() {
    this.checkPermission().then(async (permissionGranted) => {
      if (permissionGranted) {
        await this.startScan();
      } else {
        console.log('Permiso no otorgado para la cámara.');
      }
    });
  }


  startScan = async () => {

    try {
      await BarcodeScanner.checkPermission({ force: true });

    console.log('checkPermission')

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    BarcodeScanner.hideBackground();

    console.log('hideBackground')
    
    // start scanning and wait for a result
    // this will now only target QR-codes
    const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] }); 

    console.log(result + 'qr')


    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
    }
      
    } catch (error) {
      console.log(error)
    }
    // Check camera permission
    // This is just a simple example, check out the better checks below
    
  };

  checkPermission = async () => {
    // check or request permission
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
      // the user granted permission
      return true;
    }

    return false;
  };


  ngOnInit() {}

}
