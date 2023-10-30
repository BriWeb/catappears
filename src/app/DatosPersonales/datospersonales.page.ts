import { Component, OnInit } from '@angular/core';
import { UsersService } from '../helpers/users/users.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../helpers/notifications/notifications.service';

@Component({
  selector: 'DatosPersonalesPage',
  templateUrl: './datospersonales.page.html',
  styleUrls: ['./datospersonales.page.scss'],
})
export class DatosPersonalesPage implements OnInit  {

  constructor(private usersService: UsersService, private route: ActivatedRoute, private notificationsService: NotificationsService) { }
  user = {
    address:'',
    last:'',
    first:'',
    tel:'',
    photo: ''
  }

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.getUser();
    });
  }

  async getUser(){
    try {
     const respuesta = await this.usersService.getUserDocument();
     if(respuesta.ret){
      this.user = respuesta.data[0];
     }else{
      this.notificationsService.showError("Error al obtener los datos del usuario.", 'Error');
    }
    } catch (error) {
      this.notificationsService.showError("Ocurrió un error.", 'Error');
    }
  }

  async editUser(e : Event) {
    e.preventDefault();
    try {

      let ok = await this.usersService.editUserDocument(this.user);  
      if(ok){
        this.notificationsService.showSuccess("Datos guardados correctamente.", 'Éxito');

        await this.getUser();
      }
    } catch (error) {
      this.notificationsService.showError("Ocurrió un error.", 'Error');
    }
  }

}
