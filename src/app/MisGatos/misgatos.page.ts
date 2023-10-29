import { Component, OnInit } from '@angular/core';
import { UsersService } from '../helpers/servicio/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'MisGatosPage',
  templateUrl: './misgatos.page.html',
  styleUrls: ['./misgatos.page.scss'],
})
export class MisGatosPage implements OnInit {

  constructor(private servicio: UsersService, private route: ActivatedRoute) { 
  }

  cats: Array<any> = [];
  maxCaracteres: number = 100;

  public alertButtons = [
    {
      text: 'Cancelar',
      cssClass: 'alert-button-cancel',
      role: 'cancel',
      handler: () => {
        // console.log('Alert canceled');
      },
    },
    {
      text: 'Confirmar',
      cssClass: 'alert-button-confirm',
      role: 'confirm',
      handler: () => {
        // console.log('Alert confirmed');
      },
    },
  ];

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.findGatitos();
    });
  }

  async findGatitos(){
    try {
      const result = await this.servicio.getUserCatsCollection();
      if(result.ret){
        this.cats = result.data;
        console.log(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  mostrarMas(id : string){
    console.log("el id es: ", id)
  }



  async setResult(ev: any, id : string) {
    
    if(ev.detail.role == 'confirm'){
      try {
        const deleted = await this.servicio.deleteCat(id);
        if(deleted){
          await this.findGatitos();
        }
        
      } catch (error) {
        console.log(error);
      }
      
    }
  }

  
}
