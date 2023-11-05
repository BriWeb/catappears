import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/helpers/users/users.service';
import { NotificationsService } from '../helpers/notifications/notifications.service';


@Component({
  selector: 'InicioPage',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss']
})


export class InicioPage implements OnInit {

  constructor(private usersService: UsersService, private route: ActivatedRoute, private notificationsService: NotificationsService) { }



  cats : Array<any> = [];

  maxCaracteres: number = 100;

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.getAllGatitos();
    });
  }

  async getAllGatitos() {
    try {
      const result = await this.usersService.getUsersCatsLost();
      if(result.ret){
        this.cats = result.data;
      } else{
        this.notificationsService.showError("Error al obtener los gatos.", 'Error');

      }
    } catch (error) {
      this.notificationsService.showError("Ocurrió un error.", 'Error');
    }
  }

  mostrarMas() {

  }
}
