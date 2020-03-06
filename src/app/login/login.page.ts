import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public nav: NavController, public alert: AlertController) { }

  ngOnInit() {
    this.validarlocalstorage();
  }
  volver(){
    this.nav.navigateRoot('inicio');
  }
  validarlocalstorage(){
    let nombre =localStorage.getItem('nombre');
    let apellido=localStorage.getItem('apellido');
    let user=localStorage.getItem('user');
    let correo=localStorage.getItem('correo');
    let password=localStorage.getItem('pasword');
    if(correo!==null&&password!==null&&nombre!==null&&apellido!==null&&user!==null){
      this.nav.navigateRoot('tabs/tab1');
    } else {
      this.sincuenta();
      this.nav.navigateRoot('registro');
    }
  }
  async sincuenta() {
    const alert = await this.alert.create({
      message:'No te has registrado',
      animated: true
    });
    alert.present();
  }
}
