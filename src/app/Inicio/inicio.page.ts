import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss']
})
export class InicioPage implements OnInit{

  constructor(private servicio: UsersService) { }

  gatitos : Array<any> = [];

  ngOnInit() {
    this.getAllGatitos();
  }

  async getAllGatitos(){
    try {
      const result = await this.servicio.getAllUserCollection()
      this.gatitos = result.data;
    } catch (error) {
      
    }
  }
}
