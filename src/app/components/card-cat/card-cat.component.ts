import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'CardCatComponent',
  templateUrl: './card-cat.component.html',
  styleUrls: ['./card-cat.component.scss'],
})

export class CardCatComponent  implements OnInit {

  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() {}

  @Input() cat: any = {};
  @Output() delete = new EventEmitter<string>();
  maxCaracteres: number = 120;

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¿Está seguro de eliminar?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'alert-button-cancel',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Confirmar',
          cssClass: 'alert-button-confirm',
          role: 'confirm',
          handler: () => {
            this.delete.emit(this.cat.id);
          },
        },
      ],
    });

    await alert.present();
  }

  mostrarGato(){
    this.router.navigate([`/Mostrar-Gato/${localStorage.getItem('docRefToken')}/${this.cat.id}`]);
  }

  editarGato(){
    this.router.navigate([`/Editar-Gato/${this.cat.id}`]);
  }

}
