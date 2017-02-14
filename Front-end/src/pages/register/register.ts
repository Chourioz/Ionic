import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
//import { HomePage } from '../home/home';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  loading: Loading;
  createSuccess = false;
  registerCredentials = {
    email: '',
    password: '',
  };
  url = 'http://192.168.2.30:8888';

  constructor(private http: Http, private nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

  public register() {
    this.showLoading();
    this.registerService(this.registerCredentials).subscribe(success => {
      if (success) {
        this.loading.dismiss();
        this.createSuccess = true;
          this.showPopup("Success", "Account created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
    error => {
      this.showPopup("Error", error);
    });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      message: text,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           if (this.createSuccess) {
             this.nav.popToRoot();
           }
         }
       }
     ]
    });
    alert.present();
  }

  private showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Registrando Usuario...'
    });
    this.loading.present();
  }

  private registerService(credentials){
    return this.http.post(this.url+'/usuario/registrar',credentials)
    .map((res: Response)=> res.json())
    .catch(error => this.handleError(error))
  }

  private handleError (error: Response) {
    console.error(error);
        return Observable.throw(error.json().error || ' error');
  }

}
