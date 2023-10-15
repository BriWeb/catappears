import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage implements OnInit{

  constructor(private servicio: UsersService) {}

  ngOnInit(){
    this.getUser();
  }
  async getUser(){
    try {
      const user = await this.servicio.getUserCollection();
    } catch (error) {
      console.log(error);
    }
  }
}
