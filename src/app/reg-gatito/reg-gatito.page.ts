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

  enviardatos() {
    const result = this.servicio.getCatito(this.catito)
    this.verificarCamposCompletos()
    console.log(result)
    this.limpiarCampos()
  }

  verificarCamposCompletos() {
    this.camposCompletos = !!(this.catito.nombre && this.catito.ubicacion && this.catito.detalle && this.catito.img);
  }

  limpiarCampos() {
    this.catito.nombre = '';
    this.catito.ubicacion = '';
    this.catito.detalle = '';
    this.catito.img = "";
  }

  ngOnInit() { }

}
