import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-reg-gatito',
  templateUrl: './reg-gatito.page.html',
  styleUrls: ['./reg-gatito.page.scss'],
})
export class RegGatitoPage implements OnInit {

  camposCompletos: boolean = false;

  catito = {
    nombre: "",
    ubicacion: "",
    detalle: "",
    img: "",
  }

  constructor(private servicio: UsersService) { }

<<<<<<< HEAD

  // funcion para subir gato (agregar funcion al ts)
  // enviardatos() {
  //   const result = this.servicio.????(this.catito)
  //   this.verificarCamposCompletos()
  //   console.log(result)
  //   this.limpiarCampos()
  // }
=======
  enviardatos() {
    // const result = this.servicio.getCatito(this.catito)  
    // this.verificarCamposCompletos()
    // console.log(result)
    // this.limpiarCampos()
  }
>>>>>>> 181fce13619c6b5289426c9f2e0cc60c8ff6aed0

  verificarCamposCompletos() {
    // this.camposCompletos = !!(this.catito.nombre && this.catito.ubicacion && this.catito.detalle && this.catito.img);
  }

  limpiarCampos() {
    // this.catito.nombre = '';
    // this.catito.ubicacion = '';
    // this.catito.detalle = '';
    // this.catito.img = "";
  }

  ngOnInit() { }

}
