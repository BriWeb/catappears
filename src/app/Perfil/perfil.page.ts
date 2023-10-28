import { Component, OnInit } from '@angular/core';
import { UsersService } from '../helpers/servicio/users.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'PerfilPage',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})

export class PerfilPage implements OnInit{

  constructor(private servicio: UsersService) {}

  ngOnInit(){
    this.getUser();
  }

  sanitizedUrl : SafeUrl  = '';
  url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  onChangeURL(url: SafeUrl) {
    this.sanitizedUrl = url;
  }

  async getUser(){
    try {
      // await this.servicio.getAllUserCollection();
    } catch (error) {
      console.log(error);
    }
  }

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        // console.log('Alert canceled');
      },
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: async () => {
        try {
          await this.servicio.logout();
        } catch (error) {
          
        }
      },
    },
  ];
  
  setResult(ev:any) {
    // console.log(`Dismissed with role: ${ev.detail.role}`);
  }
}
