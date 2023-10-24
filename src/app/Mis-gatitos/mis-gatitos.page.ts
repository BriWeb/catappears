import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-mis-gatitos',
  templateUrl: './mis-gatitos.page.html',
  styleUrls: ['./mis-gatitos.page.scss'],
})
export class MisGatitosPage implements OnInit {

  constructor(private servicio: UsersService, private sanitizer: DomSanitizer) { 
  }

  cats: Array<any> = [];
  maxCaracteres: number = 100;


  ngOnInit() {
    this.findGatitos();
  }

  async findGatitos(){
    try {
      const result = await this.servicio.getUserCollection();
      if(result.ret){
        this.cats = result.data;
      } else {
        console.log("No trajo datos");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  mostrarMas(){
    
  }

  // Alerta de eliminar a un gatito
    public alertButtons = [
      {
        text: 'Cancelar',
        cssClass: 'alert-button-cancel',
        role: 'cancel',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'Confirmar',
        cssClass: 'alert-button-confirm',
        role: 'confirm',
        handler: () => {
          console.log('Alert confirmed');
        },
      },
    ];

    setResult(ev: any) {
      console.log(`Dismissed with role: ${ev.detail.role}`);
    }
}
