import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponenteTab1Component } from './componente-tab1/componente-tab1.component';



@NgModule({
  declarations: [ComponenteTab1Component],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule 
  ],
  exports: [ComponenteTab1Component]
})
export class ComponenteModule { }
