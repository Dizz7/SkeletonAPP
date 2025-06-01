import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {

  email: string = '';
  password: string = '';
  mensaje: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  // Mostrar toast de inicio de sesión
  async mostrarToasts() {
    const toast = await this.toastController.create({
      message: 'Iniciando Sesión.',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }

  // Mostrar errores con alert
  async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Validar formato del email
  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Método login con validaciones
  async login() {
    if (!this.email) {
      this.mostrarError('Ingrese un e-mail.');
      return;
    }

    if (this.email.length < 3 || this.email.length > 8) {
      this.mostrarError('El email debe tener entre 3 y 8 caracteres.');
      return;
    }

    if (!this.validarEmail(this.email)) {
      this.mostrarError('El email ingresado no es válido.');
      return;
    }

    if (!this.password) {
      this.mostrarError('Ingrese la contraseña.');
      return;
    }



    if (this.password.length !== 4) {
      this.mostrarError('La contraseña debe tener exactamente 4 dígitos.');
      return;
    }

    if (!/^\d+$/.test(this.password)) {
      this.mostrarError('La contraseña sólo puede contener dígitos.');
      return;
    }

    // Si todo es correcto
    await this.mostrarToasts();
    this.router.navigate(['/home'], { state: { user: this.email } });
  }
}