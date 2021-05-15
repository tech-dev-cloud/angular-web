import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  postData(apiPath: string, data: any) {
    return this.httpClient.post(`${this.baseUrl}${apiPath}`, data);
  }

  getData(apiPath: string, data?: any, option?: any) {
    return this.httpClient.get(`${this.baseUrl}${apiPath}`, { params: data, ...option })
      .pipe(map((response: any) => {
        return response;
      }));
  }

  putData(apiPath: string, data: any) {
    return this.httpClient.put(`${this.baseUrl}${apiPath}`, data);
  }

  deleteData(apiPath: string, data?: any, formData?: boolean) {
    const apiUrl = `${this.baseUrl}${apiPath}`;
    return this.httpClient.delete(apiUrl, data);
  }

}
