import { Component, OnInit } from '@angular/core';
import { AlertController, IonSearchbar, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  arrPersonas : Array<any> = [] as Array<JSON>;
  clNombre : string;
  clApellido : string;
  clUser : string;
  clCorreo : string;
  clPass : string;
  blnNext : boolean;
  strMessage : string;
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  
  constructor(public alertController : AlertController, public nav: NavController) { }

  volver(){
    this.nav.navigateRoot('inicio');
  }

  ngOnInit() {
  }

  async addPerson(strNombre : string, strApellido : string, strUser : string, strCorreo : string, strPass : string){

    this.strMessage = '';

    this.blnNext = false;

    (strNombre)? this.fnError() : this.fnError('Error : Favor de llenar el campo nombre');
    (strApellido)? this.fnError() : this.fnError('Error : Favor de llenar el campo apellido');
    (strUser)? this.fnError() : this.fnError('Error : Favor de llenar el campo usuario');
    (strCorreo)? (this.regexp.test(strCorreo)) ? this.fnError() :
    this.fnError('Error : Correo invalido') : 
    this.fnError('Error : Favor de llenar el campo e-mail');
    (strPass)? this.fnError() : this.fnError('Error : Favor de llenar el campo contraseña');


    if(!this.blnNext){
      const jsnPersona: any = {
        strNombre,
        strApellido,
        strUser,
        strCorreo,
        strPass
      };
    this.arrPersonas.push(jsnPersona);
    localStorage.setItem('nombre',this.clNombre);
    localStorage.setItem('apellido',this.clApellido);
    localStorage.setItem('user',this.clUser);
    localStorage.setItem('correo',this.clCorreo);
    localStorage.setItem('pasword',this.clPass);
    this.clNombre ='';
    this.clApellido ='';
    this.clUser ='';
    this.clCorreo ='';
    this.clPass ='';
    console.log(this.arrPersonas);
    this.nav.navigateRoot('tabs/tab1')

    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Se creo la cuenta',
      buttons: ['OK']
    });
    await alert.present();
    }else{
      this.presentAlert();
    }
  }

  fnError(msg?: string){
    if(msg){
      this.strMessage += '<br>' + msg + '<br>';
      this.blnNext = true;
    }else if(this.blnNext){
      this.blnNext = true;
    }else{
      this.blnNext = false;
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: this.strMessage,
      mode: 'ios',
      buttons: ['OK']
    });
    await alert.present();
  } 
}
