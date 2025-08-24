import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryDetailsServiceService {

  private countryDetUri = 'https://restcountries.com/v3.1/name/';

  constructor(private http: HttpClient) { }

  getCountryDetails(countryName: string, fullMatch: boolean){
    const url =  this.countryDetUri + countryName;
    return this.http.get<any>(url, {params: {fullText: fullMatch}});
  }
}
