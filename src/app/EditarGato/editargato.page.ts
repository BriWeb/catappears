import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../helpers/notifications/notifications.service';
import { UsersService } from '../helpers/users/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'EditarGatoPage',
  templateUrl: './editargato.page.html',
  styleUrls: ['./editargato.page.scss'],
})
export class EditarGatoPage implements OnInit {

  constructor(private usersService: UsersService, private notificationsService: NotificationsService, private route: ActivatedRoute) { }
  
  cat = {
    city: '',
    description: '',
    location: '',
    name: '',
    photo: '',
    lost: false,
    age: ''
  };

  id = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getCat();
    });
  }

  async getCat() {
    try {
      const userDocRef = localStorage.getItem('docRefToken');
      if(userDocRef){
        const result = await this.usersService.getCatDocument(userDocRef, this.id);
        if(result.ret){
          this.cat = result.data;
        }else {
          this.notificationsService.showError("Error al buscar el gato.", 'Error');
        }
      }
    } catch (error) {
      this.notificationsService.showError("Ocurrió un error.", 'Error');
    }
  }

  async editCat(e : Event){
    e.preventDefault();
    try {
      let ok = await this.usersService.editCatDocument(this.cat, this.id);
      if(ok){
        this.notificationsService.showSuccess("Datos actualizados correctamente.", 'Éxito');
        await this.getCat();
      } else {
        this.notificationsService.showError("Error al actualizar el gato.", 'Error');
      }
    } catch (error) {
      this.notificationsService.showError("Ocurrió un error.", 'Error');
    }
  }
}
