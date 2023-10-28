import { Component, OnInit } from '@angular/core';
import { UsersService } from '../helpers/servicio/users.service';

@Component({
  selector: 'DatosPersonalesPage',
  templateUrl: './datospersonales.page.html',
  styleUrls: ['./datospersonales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {

  constructor(private servicio: UsersService) { }
  user = {
    address:'',
    last:'',
    first:'',
    tel:''
  }
  ngOnInit() {
    this.getUsers()
  }

  async getUsers(){
    try {
     const respuesta = await this.servicio.getUserCollection()
     if(respuesta.ret){
    this.user = respuesta.data[0]
     }else{
      console.log('El método lanzó error')
     }
    } catch (error) {
      console.log('El método lanzó error')
    }
  }

  async editUser(e : Event) {
    e.preventDefault();
    try {

      let ok = await this.servicio.editUser(this.user);  
      if(ok){
        console.log("Éxito al editar usuario");
      }
    } catch (error) {
      console.log("Error al editar usuario");
    }
  }

}
