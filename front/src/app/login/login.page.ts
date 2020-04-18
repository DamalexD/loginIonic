import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import {Router} from '@angular/router';
import { LoginService } from '../services/login.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  clNombre:string;
  clPass:string;
  strMessage: string;
  blnNext: boolean;
  name: string;
  
  // tslint:disable-next-line: max-line-length
  constructor(public alertController: AlertController, private router: Router, public nav: NavController, public loginService: LoginService) { }
  ngOnInit(): void {
  }



  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Un campo ingresado es inválido',
      message: this.strMessage,
      buttons: ['Deja le checo xD']
    });

    await alert.present();
  }
  
  async userNotFound() {
    const alert = await this.alertController.create({
      header: 'Error, usuario no encontrado',
      message: this.strMessage,
      buttons: ['OK']
    });

    await alert.present();
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
  

  volver(){
      this.nav.navigateRoot('inicio');
  }

  login(form: NgForm){
    this.loginService.postLogin(form.value).subscribe(res  =>{
      let data = JSON.stringify(res);
      let dataLogin = JSON.parse(data);
      console.log(dataLogin);
      if (dataLogin.User){
        this.router.navigate(['/tabs/tab1']);
      }else{
        this.userNotFound();
      }
    });
  }
}





