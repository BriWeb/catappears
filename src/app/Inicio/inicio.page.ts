import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/helpers/servicio/users.service';


@Component({
  selector: 'InicioPage',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss']
})


export class InicioPage implements OnInit {

  constructor(private servicio: UsersService) { }



  cats : Array<any> = [];

  maxCaracteres: number = 100;

  ngOnInit() {
    this.getAllGatitos();
  }

  async getAllGatitos() {
    try {
      const result = await this.servicio.getUsersCatsCollection();
      if(result.ret){
        this.cats = result.data;
      } else{
        console.log("Error al obtener los gatos");
      }
    } catch (error) {
      console.log(error);
    }
  }

  mostrarMas() {

  }
}
