import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  private createAccount(){
    this.navCtrl.push(RegisterPage);
  }

  private forGotPassword(){
    this.navCtrl.push(ForgotpasswordPage);
  }
}
