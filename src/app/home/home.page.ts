import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  user: string = '';
  nombre: string = '';
  apellido: string = '';
  educacion: string = '';
  nivelesEducacion: string[] = [
    'Básica',
    'Media',
    'Pregrado',
    'Postgrado',
    'Doctorado'
  ];
  nacimiento: Date | null = null;
  nombreAnimado: boolean = false;
  apellidoAnimado: boolean = false;

  constructor(private router: Router,
    private alertController: AlertController,
    private animationCtrl: AnimationController
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { user: string };

    if (state?.user) {
      this.user = state.user;
    }
  }


  @ViewChild('inputNombre', { static: false }) inputNombre!: ElementRef;
  @ViewChild('inputApellido', { static: false }) inputApellido!: ElementRef;
  @ViewChild('cardAnimado', { static: false }) cardAnimado!: ElementRef;




 // Método limpiar animado
  async limpiar() {
    this.nombre = '';
    this.apellido = '';
    this.educacion = '';
    this.nacimiento = null;
  
    // Animación de izquierda a derecha para nombre
    const animNombre = this.animationCtrl
      .create()
      .addElement(this.inputNombre.nativeElement)
      .duration(1000)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translateX(0)' },
        { offset: 0.5, transform: 'translateX(20px)' },
        { offset: 1, transform: 'translateX(0)' }
      ]);
  
    // Animación de izquierda a derecha para apellido
    const animApellido = this.animationCtrl
      .create()
      .addElement(this.inputApellido.nativeElement)
      .duration(1000)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translateX(0)' },
        { offset: 0.5, transform: 'translateX(20px)' },
        { offset: 1, transform: 'translateX(0)' }
      ]);
  
    animNombre.play();
    animApellido.play();
  }



  // Mostrar información con alert
  async mostrarInfo(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Usuario',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }




// Método mostrar
async mostrar() {
  if (!this.nombre && !this.apellido) {
    await this.mostrarInfo('Ingrese su nombre y apellido.');
    return;
  }

  if (!this.nombre) {
    await this.mostrarInfo('Ingrese su nombre.');
    return;
  }

  if (!this.apellido) {
    await this.mostrarInfo('Ingrese su apellido.');
    return;
  }

  // Si ambos están presentes
  await this.mostrarInfo(`Su nombre es ${this.nombre} ${this.apellido}.`);
}
}
    

