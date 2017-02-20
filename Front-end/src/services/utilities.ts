import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class UtilitieService {

	constructor(private http: Http){}

	public getPaises(){
		return this.http.get('http://192.168.2.30:1337/utilities/paises')
		.toPromise()
		.then((res : Response) => res.json().paises)
		.catch((error: Response) => error.json().error);
	}
}