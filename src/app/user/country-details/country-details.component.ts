import { Component } from '@angular/core';
import { CountryDetailsServiceService } from '../../services/country-details-service.service';
import { debounceTime, Subject } from 'rxjs';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-details',
  imports: [CommonModule, NavBarComponent],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.css'
})
export class CountryDetailsComponent {

  query: string = 'india'
  exactMatch: boolean = false;
  countries: any = [];
  private searchInput = new Subject<string>();
  selectedCountry: any = null;

  constructor(private countryService: CountryDetailsServiceService) {
    this.searchInput
      .pipe(debounceTime(400)) // wait 400ms after user stops typing
      .subscribe(value => {
        this.query = value;
        this.getCountryDetails();
      })
  }

  getSearchResult(event: Event) {
    const searchVal = (event.target as HTMLInputElement).value;
    this.searchInput.next(searchVal);
  }

  getCountryDetails() {
    this.countryService.getCountryDetails(this.query, this.exactMatch).subscribe(
      datas => {
        this.countries = datas;
      }
    );
  }

  openDetails(country: any) {
    this.selectedCountry = country;
  }

  closeDetails() {
    this.selectedCountry = null;
  }
}
