import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { HomePage } from '../home/home';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: Loading;
  registerCredentials = {usuario: '', password: ''};
  url = 'http://192.168.2.30:8888';
  constructor(private http: Http, private navCtrl: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

  public createAccount(){
    this.navCtrl.push(RegisterPage);
  }

  public recuperarPassword(){
    this.navCtrl.push(ForgotpasswordPage);
  }

  public login(){
    this.showLoading()
    this.loginService(this.registerCredentials)
    .subscribe(allowed => {
      if(allowed){
        setTimeout(()=>{
          this.loading.dismiss();
          this.navCtrl.setRoot(HomePage)
        });
      }
    },
    error=>{
      this.showError(error)
    })
  }

  private showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Iniciando Sesion...'
    });
    this.loading.present();
  }

  private showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
    console.log(text);
    let alert = this.alertCtrl.create({
      title: 'Error',
      message: text.mjsUsuario,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  private loginService(credentials){
    if (credentials.usuario === null || credentials.password === null) {
     return Observable.throw("Please insert credentials");
   }else{
    return this.http.post(this.url+'/usuario/login', this.registerCredentials)
     .map((res: Response)=> res.json())
     .catch(error => this.handleError(error))
   }
  }

  private handleError (error: Response) {
    console.error(error);
        return Observable.throw(error.json().error || ' error');
  }
}
