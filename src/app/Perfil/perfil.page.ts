import { Component, OnInit } from '@angular/core';
import { UsersService } from '../helpers/users/users.service';
import { NotificationsService } from '../helpers/notifications/notifications.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'PerfilPage',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})

export class PerfilPage implements OnInit{
  
  constructor(private usersService: UsersService, private notificationsService: NotificationsService, private route: ActivatedRoute) {}

  photo = '';

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {

      },
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: async () => {
        try {
          await this.usersService.logout();

        } catch (error) {
          this.notificationsService.showError("Ocurrió un error.", 'Error');
        }
      },
    },
  ];
  
  ngOnInit() {
    this.route.url.subscribe(url => {
      this.getUser();
    });
  }

  async getUser(){
    try {
     const respuesta = await this.usersService.getUserDocument();
     if(respuesta.ret){
      let userPhoto = respuesta.data[0].photo;
      if(userPhoto){
        this.photo = respuesta.data[0].photo;
      } else {
        this.photo = '../../assets/avatar.jpeg';
      }
     }else{
      this.notificationsService.showError("Error al obtener la foto de perfil del usuario.", 'Error');
    }
    } catch (error) {
      this.notificationsService.showError("Ocurrió un error.", 'Error');
    }
  }
}
