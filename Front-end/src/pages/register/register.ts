import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, Loading } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthenticationService } from '../../services/auth-service';
import { UtilitieService } from '../../services/utilities';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  loading: Loading;
  createSuccess = false;
  registerCredentials = {
    nombre:'',
    apellido:'',
    tipo_persona:'',
    email:'',
    pais:'',
    identificacion:'',
    telefono_principal:'',
    res_direccion:'',
    fecha_nacimiento:'',
    password:''
  };

  paises = [];

  idPrefijos = [{valorVisual: 'V'}, {valorVisual: 'E'}];
  tlfPrefijos = [
    {valorReal:'+58212', valorVisual:'0212'},
    {valorReal:'+58412', valorVisual:'0412'},
    {valorReal:'+58416', valorVisual:'0416'},
    {valorReal:'+58426', valorVisual:'0426'},
    {valorReal:'+58414', valorVisual:'0414'},
    {valorReal:'+58424', valorVisual:'0424'}
  ];

  constructor(private utilities: UtilitieService,private auth: AuthenticationService, private nav: NavController, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    this.utilities.getPaises()
    .then(
      paises => this.paises = paises,

      error => this.showError(error)
    );
  }

  public registerUser() {
    this.showLoading();
    this.auth.register(this.registerCredentials)
    .then(
      usuario => {
        this.loading.dismiss();
        this.nav.setRoot(HomePage);
      },

      error => this.showError(error)
    );
  };

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
