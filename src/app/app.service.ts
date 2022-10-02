import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = 'https://reshape-service.herokuapp.com/api';

  getCSV(data: any) {
    return this.http.post(this.rootURL + '/csv', {data});
  }

  getFlatten(data: any) {
    return this.http.post(this.rootURL + '/flatten', {data});
  }

  getFlattenTraditional(data: any){
    return this.http.post(this.rootURL + '/flatten/traditional', {data});
  }

  getCSVForFile(data: any) {
    return this.http.post(this.rootURL + '/csv/file', data);
  }

  getFlattenForFile(data: any) {
    return this.http.post(this.rootURL + '/flatten/file', data);
  }

  getFlattenTraditionalForFile(data: any){
    return this.http.post(this.rootURL + '/flatten/traditional/file', data);
  }
}
