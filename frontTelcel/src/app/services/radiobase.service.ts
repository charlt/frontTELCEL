import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RadioBaseService {

  API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  obtenerRadiobases(): Observable<any> {
    const href = this.API_URL + '/getAllData';
    const requestUrl = `${href}`;
    return this.http.get<any>(requestUrl);
  }
  obtenerRadiobasesDetail(name:any): Observable<any> {
    const href = this.API_URL + '/getRadioBase/'+name;
    const requestUrl = `${href}`;
    return this.http.get<any>(requestUrl);
  }
  obtenerRadiobasesDetailRegion(name:any, region:any): Observable<any> {
    const href = this.API_URL + '/searchRegion/'+name+"?region="+region;
    const requestUrl = `${href}`;
    return this.http.get<any>(requestUrl);
  }
  obtenerRadiobasesByName(name:any): Observable<any> {
    const href = this.API_URL + '/getRadiobaseByName?name='+name;
    const requestUrl = `${href}`;
    return this.http.get<any>(requestUrl);
  }
}
