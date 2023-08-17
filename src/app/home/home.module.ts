import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { PoButtonModule } from '@po-ui/ng-components';
import { PoLinkModule } from '@po-ui/ng-components';
import { PoModule } from '@po-ui/ng-components';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    HttpClientModule,
    IonicModule,
    PoButtonModule,
    PoLinkModule,
    PoModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
