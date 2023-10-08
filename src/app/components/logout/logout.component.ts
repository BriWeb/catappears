import { Component} from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent{

  constructor(private servicio: UsersService) { }

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
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
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }
}
