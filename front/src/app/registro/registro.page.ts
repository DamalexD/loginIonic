import { Component, OnInit } from '@angular/core';
import { IonSearchbar, NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service';
import {Users} from '../models/users';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  private todo : FormGroup;
  data: string;
  dataJSON;
  // arrPersonas : Array<any> = [] as Array<JSON>;
  // firstName : string;
  // secondName : string;
  // userName : string;
  // email : string;
  // password : string;
  blnNext : boolean;
  strMessage : string;
  // tslint:disable-next-line: max-line-length
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  constructor(public router: Router,public nav: NavController, public userService: UserService , private formBuilder: FormBuilder, public alertController: AlertController) { 
    this.todo = this.formBuilder.group({
      firstName: ['', Validators.required],
      secondName: [''],
      userName: [''],
      email: [''],
      password: ['']
    });
    
    
  }
  // // user = {
  // //   firstname:"",
  // //   secondName:"",
  // //   userName:"",
  // //   email:"",
  // //   password:""
  // // };
   ngOnInit() {
   }
  async addUser(form: NgForm){
    this.data = JSON.stringify(this.todo.value);
    this.dataJSON = JSON.parse(this.data);
    let strFN = this.dataJSON.firstName;
    let strSN = this.dataJSON.secondName;
    let strUN = this.dataJSON.userName;
    let strEmail = this.dataJSON.email;
    let strPass = this.dataJSON.password;
    this.strMessage = '';
    this.blnNext = false;
    (strFN)? this.fnError() : this.fnError('Error : Favor de llenar el campo nombre');
    (strSN)? this.fnError() : this.fnError('Error : Favor de llenar el campo apellido');
    (strUN)? this.fnError() : this.fnError('Error : Favor de llenar el campo usuario');
    (strEmail)? (this.regexp.test(strEmail)) ? this.fnError() :
    this.fnError('Error : Correo invalido') :
    this.fnError('Error : Favor de llenar el campo e-mail');
    (strPass)? this.fnError() : this.fnError('Error : Favor de llenar el campo contraseña'); 


    if(!this.blnNext){
          // const jsnPersona: any = {
          //   name : this.firstName,
          //   lastname : this.secondName,
          //   user : this.userName,
          //   correo : this.email,
          //   pass : this.password
          // };
          // this.arrPersonas.push(jsnPersona);
          // this.firstName ='';
          // this.secondName ='';
          // this.userName ='';
          // this.email ='';
          // this.password ='';
          // console.log(this.arrPersonas);
          this.userService.postUser(form.value)
      .subscribe(async res => {
        // console.log(this.todo.value);
        console.log(res);
        if(!res){
          console.log("Nel valió kk xd");
          this.presentAlert();
        }else{
          this.router.navigate(['/login']);
          const alert = await this.alertController.create({
                header: 'Éxito',
                message: 'Se creo la cuenta',
                buttons: ['OK']
              });
              await alert.present();
          }
      });
        }else{
          this.presentAlert();
        }




    // this.userService.postUser(form.value)
    //   .subscribe(async res => {
    //     // console.log(this.todo.value);
    //     console.log(res);
    //     if(!res){
    //       console.log("Nel valió kk xd");
    //       this.presentAlert();
    //     }else{
    //       this.router.navigate(['/login']);
    //       const alert = await this.alertController.create({
    //             header: 'Éxito',
    //             message: 'Se creo la cuenta',
    //             buttons: ['OK']
    //           });
    //           await alert.present();
    //       }
    //   });
      
  }
  volver(){
    this.nav.navigateRoot('inicio');
  }

  // // firstName: String,secondName: String,userName: String,email: String,password: String
  // async addUser(){
  //   this.strMessage = '';
  //   this.blnNext = false;
  //   (this.firstName)? this.fnError() : this.fnError('Error : Favor de llenar el campo nombre');
  //   (this.secondName)? this.fnError() : this.fnError('Error : Favor de llenar el campo apellido');
  //   (this.userName)? this.fnError() : this.fnError('Error : Favor de llenar el campo usuario');
  //   (this.email)? (this.regexp.test(this.email)) ? this.fnError() :
  //   this.fnError('Error : Correo invalido') :
  //   this.fnError('Error : Favor de llenar el campo e-mail');
  //   (this.password)? this.fnError() : this.fnError('Error : Favor de llenar el campo contraseña'); 

  //   if(!this.blnNext){
  //     const jsnPersona: any = {
  //       name : this.firstName,
  //       lastname : this.secondName,
  //       user : this.userName,
  //       correo : this.email,
  //       pass : this.password
  //     };
  //     this.arrPersonas.push(jsnPersona);
  //     this.firstName ='';
  //     this.secondName ='';
  //     this.userName ='';
  //     this.email ='';
  //     this.password ='';
  //     // console.log(this.arrPersonas);
  //     this.userService.postUser(jsnPersona).subscribe(res => {
  //       console.log(res);
  //     });
  //     this.nav.navigateRoot('tabs/tab1');
  //     const alert = await this.alertController.create({
  //     header: 'Éxito',
  //     message: 'Se creo la cuenta',
  //     buttons: ['OK']
  //   });
  //     await alert.present();
  //   }else{
  //     this.presentAlert();
  //   }
  // }

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
