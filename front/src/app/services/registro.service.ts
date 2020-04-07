import { Injectable } from '@angular/core';
import { AlertController, IonSearchbar, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service';
import {Users} from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(public alertController : AlertController, public nav: NavController, public userService: UserService) { }
  arrPersonas : Array<any> = [] as Array<JSON>;
  firstName : string;
  secondName : string;
  userName : string;
  email : string;
  password : string;
  blnNext : boolean;
  strMessage : string;
  // tslint:disable-next-line: max-line-length
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  // user = {
  //   firstname:"",
  //   secondName:"",
  //   userName:"",
  //   email:"",
  //   password:""
  // };
  ngOnInit() {
    this.getUsers();
  }
  volver(){
    this.nav.navigateRoot('inicio');
  }

  // firstName: String,secondName: String,userName: String,email: String,password: String
  async addUser(){
    this.strMessage = '';
    this.blnNext = false;
    (this.firstName)? this.fnError() : this.fnError('Error : Favor de llenar el campo nombre');
    (this.secondName)? this.fnError() : this.fnError('Error : Favor de llenar el campo apellido');
    (this.userName)? this.fnError() : this.fnError('Error : Favor de llenar el campo usuario');
    (this.email)? (this.regexp.test(this.email)) ? this.fnError() :
    this.fnError('Error : Correo invalido') :
    this.fnError('Error : Favor de llenar el campo e-mail');
    (this.password)? this.fnError() : this.fnError('Error : Favor de llenar el campo contraseña'); 

    if(!this.blnNext){
      const jsnPersona: any = {
        firstName : this.firstName,
        lastname : this.secondName,
        user : this.userName,
        email : this.email,
        password : this.password
      };
      this.arrPersonas.push(jsnPersona);
      this.firstName ='';
      this.secondName ='';
      this.userName ='';
      this.email ='';
      this.password ='';
      console.log(this.arrPersonas);
      this.userService.postUser(jsnPersona).subscribe(res => {
        console.log(res);
      });
      this.nav.navigateRoot('tabs/tab1');
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
  getUsers(){
    this.userService.getUsers()
    .subscribe(res =>{
      this.userService.users = res as Users[];
      console.log(res);
    })
  }
}
