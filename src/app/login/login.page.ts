import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  constructor(private toastController: ToastController) {}

  async mostrarToasts() {
    const toast1 = await this.toastController.create({
      message: 'Intentando Iniciar Sesión...',
      duration: 2000,
      color: 'primary'
    });

    await toast1.present();

    
    const { role } = await toast1.onDidDismiss();

    
    const toast2 = await this.toastController.create({
      message: 'Esta función está en desarrollo.',
      duration: 2000,
      color: 'success'
    });

    await toast2.present();
  }

  ngOnInit() {
  }

}
