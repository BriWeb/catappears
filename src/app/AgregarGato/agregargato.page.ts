import { Component, OnInit } from '@angular/core';
import { UsersService } from '../helpers/servicio/users.service';

@Component({
  selector: 'app-agregargato',
  templateUrl: './agregargato.page.html',
  styleUrls: ['./agregargato.page.scss'],
})
export class AgregarGatoPage implements OnInit {
  
  constructor(private servicio: UsersService) { }
  
  cat = {
    city: '',
    description: '',
    location: '',
    name: '',
    photo: '',
    lost: false,
    age: ''
  };

  ngOnInit() { }

  async handlePost(e : Event) {
    e.preventDefault();
    try {
      if(this.verificarCamposCompletos()){
        const cat_id = await this.servicio.createCatColecction(this.cat);  
        if(cat_id){
          this.limpiarCampos();
          console.log("gato creado exitosamente con el id: ", cat_id.id);
        } else {
          console.log("Error al crear el gatito");
        }
      } else {
        console.log("Debe completar todos los campos");
      }
      
    } catch (error) {
      console.log("Error al crear el gatito");
    }
  }

  verificarCamposCompletos() {
    return !!(this.cat.city && this.cat.description && this.cat.location && this.cat.name && this.cat.photo && this.cat.age);
  }

  limpiarCampos() {
    this.cat.city = '';
    this.cat.description = '';
    this.cat.location = '';
    this.cat.name = '';
    this.cat.photo = '';
    this.cat.lost = false;
    this.cat.age = '';
  }



}
