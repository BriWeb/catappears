import { Component, OnInit } from '@angular/core';

import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-scaner',
  templateUrl: './scaner.component.html',
  styleUrls: ['./scaner.component.scss'],
})
export class ScanerComponent implements OnInit {

  constructor(private router : Router, private route: ActivatedRoute) { }

  // async checkPermissionAndStartScan() {
  //   try {
  //     const permissionGranted = await this.checkPermission();

  //     if (permissionGranted) {
  //       await this.startScan();
  //     } else {
  //       console.log('Permiso no otorgado para la cámara.');
  //     }
      
  //   } catch (error) {
  //     console.log('Permiso no otorgado para la cámara.');
  //   }
  // }


  // startScan = async () => {

  //   try {
  //     await BarcodeScanner.checkPermission({ force: true });

  //     console.log('checkPermission')

  //     // BarcodeScanner.hideBackground();

  //     const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] }); 

  //     console.log(result + 'qr')


  //     if (result.hasContent) {
  //       this.router.navigate([""+ result.content]);
  //       console.log(result.content); // log the raw scanned content
  //     }
      
  //   } catch (error) {
  //     console.log(error)
  //   }

    
  // };

  // checkPermission = async () => {
  //   const status = await BarcodeScanner.checkPermission({ force: true });

  //   if (status.granted) {
  //     return true;
  //   }

  //     const c = confirm('Si quieres otorgar permisos para usar tu cámara, activalo en las configuraciones de aplicación.');
  //     if (c) {
  //       BarcodeScanner.openAppSettings();
  //       return true
  //     }

  //   return false;
  // };




  // prepare = () => {
  //   BarcodeScanner.prepare();
  // };
  
  // startScan = async () => {
  //   BarcodeScanner.hideBackground();

  //   const result = await BarcodeScanner.startScan();
  //   if (result.hasContent) {
  //     console.log(result.content);
  //   }
  // };
  
  // stopScan = () => {
  //   BarcodeScanner.showBackground();
  //   BarcodeScanner.stopScan();
  // };
  
  // askUser = () => {
  //   this.prepare();
  
  //   const c = confirm('¿Deseas escanear un código?');

  //   if (c) {
  //     this.startScan();
  //   }

  // };

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.startScan();
    });
  }

  stopScan = () => {
    BarcodeScanner.stopScan();
    this.router.navigate(['/Inicio']);
  };

  startScan = async () => {
    await BarcodeScanner.checkPermission({ force: true });
    
    const result = await BarcodeScanner.startScan();
  
    if (result.hasContent) {
      BarcodeScanner.stopScan();
      this.router.navigate([`${result}`]);
    }
  };

}
