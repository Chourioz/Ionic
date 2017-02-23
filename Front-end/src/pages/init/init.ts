import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { AuthenticationService } from '../../services/auth-service';


/*
  Generated class for the Init page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-init',
  templateUrl: 'init.html'
})
export class InitPage {

  loading: Loading;

  loginCredentials = {usuario: '', password: ''};

	FB_APP_ID: number = 1113412445434950;

  constructor(private toastCtrl: ToastController ,public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private auth: AuthenticationService) {
  	Facebook.browserInit(this.FB_APP_ID, "v2.8");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitPage');
  }

  doFbLogin(){
    let permissions = new Array<string>();
    let nav = this.navCtrl;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];

    Facebook.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        NativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          nav.push(HomePage);
        }, function (error) {
          console.log(error);
        })
      })
    }, function(error){
      console.log(error);
    });
  };

  registrar(){
    this.navCtrl.setRoot(RegisterPage);
  }


  iniciarSesion(){
    return this.auth.login(this.loginCredentials)
    .then(
      siguiente => this.navCtrl.setRoot(HomePage),
      error => this.showError(error)
    );
  }

  private showError(error){
    setTimeout(() => {
      this.loading.dismiss();
    });

    let toast = this.toastCtrl.create({
      message: error,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  };


  private showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Registrando Usuario...'
    });
    this.loading.present();
  }
}
