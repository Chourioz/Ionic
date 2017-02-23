import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class AuthenticationService  {
	url = 'http://192.168.2.30:1337';

	constructor(private http : Http) {
		// code...
	}

	public register(data){
		console.log('Data', data)
		if(data == null || data == undefined) {
			return Promise.reject("Por favor inserte las credenciales");
		}else{
			return this.http.post(this.url+'/usuario/registrar', data)
			.toPromise()
			.then(this.extractData)
			.catch(this.handleError);
		}
	};

	public login(data){
		if(data.usuario == null || data.password == null) return Promise.reject("No se sumunistraron las credenciales");
		else return this.http.post(this.url+'/usuario/login', data)
			.toPromise()
			.then(this.extractData)
			.catch(this.handleError);
	};

	private extractData(res: Response){
		let body = res.json();

		return body.data || {};
	};

	private handleError(error: Response){
		let errMsg: string;

		if(error instanceof Response) {
			const body = error.json() || '';
			const err = body.error;

			errMsg = err.error;
		}

		return Promise.reject(errMsg);
	}
}