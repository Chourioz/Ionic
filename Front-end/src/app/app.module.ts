import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { InitPage } from '../pages/init/init';
import { BackgroundImage } from '../directives/background-image';
import { UtilitieService } from '../services/utilities';
import { AuthenticationService } from '../services/auth-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    LoginPage,
    BackgroundImage,
    InitPage,
    RegisterPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    LoginPage,
    InitPage,
    RegisterPage

  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, UtilitieService, AuthenticationService]
})
export class AppModule {}
