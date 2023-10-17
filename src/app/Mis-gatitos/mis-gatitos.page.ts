import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-mis-gatitos',
  templateUrl: './mis-gatitos.page.html',
  styleUrls: ['./mis-gatitos.page.scss'],
})
export class MisGatitosPage implements OnInit {

  constructor(private servicio: UsersService) { 
  }

  gatitos: Array<any> = [];
  maxCaracteres: number = 100;

  ngOnInit() {
    this.findGatitos();
  }

  async findGatitos(){
    try {
      const result = await this.servicio.getUserCollection();
      if(result.ret){
        this.gatitos = result.data;
      } else {
        console.log("No trajo datos");
      }
    } catch (error) {
      console.log(error);
    }
  }

  mostrarMas(){
    
  }
}
