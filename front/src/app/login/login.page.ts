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

  // async loguearse(strName: string, strPass: string, form: NgForm){
  //   this.strMessage = '';

  //   (strName)? this.fnError() : this.fnError('Error: Podrías hacernos el favor a ambos de llenar el usuario');
  //   (strPass)? this.fnError() : this.fnError('Error : ¿Eres tonto o no puedes poner tú contraseña?');

  //   if(this.clNombre == "admin" && this.clPass == "123"){
  //     this.router.navigate(['tabs/tab1']);
  //     localStorage.setItem('usuario',this.clNombre);
  //     localStorage.setItem('pass',this.clPass);
  //   }else{
  //     this.presentAlert();
  //   }
  // }



  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Un campo ingresado es inválido',
      message: this.strMessage,
      buttons: ['Deja le checo xD']
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
      if (dataLogin.User){
        this.router.navigate(['/hello']);
      }else{
        console.log('Error not found');
      }
    });
  }
}





