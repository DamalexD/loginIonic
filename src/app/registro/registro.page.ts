import { Component, OnInit } from '@angular/core';
import { AlertController, IonSearchbar } from '@ionic/angular';

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
  clPass2 : string;
  blnNext : boolean;
  strMessage : string;
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  
  constructor(public alertController : AlertController) { }

  ngOnInit() {
  }

  async addPerson(strNombre : string, strApellido : string, strUser : string, strCorreo : string, strPass : string, strPass2 : string){

    this.strMessage = '';

    this.blnNext = false;

    (strNombre)? this.fnError() : this.fnError('Error : Favor de llenar el campo nombre');
    (strApellido)? this.fnError() : this.fnError('Error : Favor de llenar el campo apellido');
    (strUser)? this.fnError() : this.fnError('Error : Favor de llenar el campo usuario');
    (strCorreo)? (this.regexp.test(strCorreo)) ? this.fnError() :
    this.fnError('Eror : Correo invalido') : 
    this.fnError('Error : Favor de llenar el campo e-mail');
    (strPass)? this.fnError() : this.fnError('Error : Favor de llenar el campo contraseña');
    (strPass2)? this.fnError() : this.fnError('Error : Favor de confirmar la contraseña');

    this.clNombre ='';
    this.clApellido ='';
    this.clUser ='';
    this.clCorreo ='';
    this.clPass ='';
    this.clPass2 ='';

    if(!this.blnNext){
      const jsnPersona: any = {
        strNombre,
        strApellido,
        strUser,
        strCorreo,
        strPass,
        strPass2
      };
    this.arrPersonas.push(jsnPersona);
    console.log(this.arrPersonas);

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
