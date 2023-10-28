import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/helpers/servicio/users.service';





@Component({
  selector: 'InicioPage',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss']
})


export class InicioPage implements OnInit {

  constructor(private servicio: UsersService) { }

  gatitos: Array<any> = [];
  maxCaracteres: number = 100;

  ngOnInit() {
    this.getAllGatitos();
  }

  async getAllGatitos() {
    try {
      const result = await this.servicio.getAllUserCollection()
      this.gatitos = result.data;
      // console.log("gatitos: ", result);
    } catch (error) {
      console.log(error);
    }
  }

  mostrarMas() {

  }
}
