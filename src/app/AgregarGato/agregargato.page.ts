import { Component } from '@angular/core';
import { UsersService } from '../helpers/users/users.service';
import { NotificationsService } from '../helpers/notifications/notifications.service';

@Component({
  selector: 'app-agregargato',
  templateUrl: './agregargato.page.html',
  styleUrls: ['./agregargato.page.scss'],
})
export class AgregarGatoPage {
  
  constructor(private usersService: UsersService, private notificationsService: NotificationsService) { }
  
  cat = {
    city: '',
    description: '',
    location: '',
    name: '',
    photo: '',
    lost: false,
    age: ''
  };


  async handlePost(e : Event) {
    e.preventDefault();
    try {
      if(this.verificarCamposCompletos()){
        const cat_id = await this.usersService.createCatDocument(this.cat);  
        if(cat_id){
          this.notificationsService.showSuccess("Gato creado correctamente.", 'Éxito');
          this.limpiarCampos();
        } else {
          this.notificationsService.showError("Error al crear el gato.", 'Error');
        }
      } else {
        this.notificationsService.showWarning("Debe completar todos los campos.", 'Alerta');
      }
      
    } catch (error) {
      this.notificationsService.showError("Error al crear el gato.", 'Error');
    }
  }

  verificarCamposCompletos() {
    return !!(this.cat.city && this.cat.description && this.cat.location && this.cat.name && this.cat.photo && this.cat.age);
  }

  limpiarCampos() {
    this.cat.city = '';
    this.cat.description = '';
    this.cat.location = '';
    this.cat.name = '';
    this.cat.photo = '';
    this.cat.lost = false;
    this.cat.age = '';
  }



}
