import { Component, OnInit } from '@angular/core';
import { UsersService } from '../helpers/users/users.service';
import { NotificationsService } from '../helpers/notifications/notifications.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'MostrarGatoPage',
  templateUrl: './mostrargato.page.html',
  styleUrls: ['./mostrargato.page.scss'],
})
export class MostrarGatoPage implements OnInit {

  constructor(private usersService: UsersService, private notificationsService: NotificationsService, private route: ActivatedRoute) { }

  cat : any = {
    // city: '',
    // description: '',
    // location: '',
    // name: '',
    // photo: '',
    // lost: false,
    // age: 0
  };

  cat_id = '';

  user : any = {
    address:'',
    last:'',
    first:'',
    tel:'',
    photo: ''
  }

  user_id = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cat_id = params['cat_id'];
      this.user_id = params['user_id'];
      this.getData();
    });
  }

  async getData(){
    try {
      let response = await this.usersService.getUserAndCatDocuments(this.cat_id, this.user_id);
      if(response.ret){
        this.cat = response.data.cat;
        this.user = response.data.user;
      }else{
        this.notificationsService.showError("Error al buscar el gato.", 'Error');
      }
    } catch (error) {
      this.notificationsService.showError("Ocurrió un error.", 'Error');
    }
  }
}
