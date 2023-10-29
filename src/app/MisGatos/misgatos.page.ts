import { Component, OnInit } from '@angular/core';
import { UsersService } from '../helpers/users/users.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../helpers/notifications/notifications.service';

@Component({
  selector: 'MisGatosPage',
  templateUrl: './misgatos.page.html',
  styleUrls: ['./misgatos.page.scss'],
})
export class MisGatosPage implements OnInit {

  constructor(private usersService: UsersService, private route: ActivatedRoute, private notificationsService: NotificationsService) { 
  }

  cats: Array<any> = [];


  ngOnInit() {
    this.route.url.subscribe(url => {
      this.findGatitos();
    });
  }

  async findGatitos(){
    try {
      const result = await this.usersService.getUserCatsCollection();
      if(result.ret){
        this.cats = result.data;
      } else {
        this.notificationsService.showError("Error al obtener tus gatos.", 'Error');
      }
    } catch (error) {
      this.notificationsService.showError("Ocurrió un error.", 'Error');
    }
  }
  

  async delete(id : string){
    try {
      const deleted = await this.usersService.deleteCatDocument(id);
      if(deleted){
        this.notificationsService.showSuccess("Gato eliminado correctamente.", 'Éxito');

        await this.findGatitos();
      } else {
        this.notificationsService.showError("Error al eliminar el gato.", 'Error');
      }
      
    } catch (error) {
      this.notificationsService.showError("Ocurrió un error.", 'Error');
    }
  }
  

  
}
