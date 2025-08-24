import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { SpotifyNewAlbumServiceService } from '../../services/spotify-new-album-service.service';
import { Items } from '../../models/spotify/search-model.model';
import { NewReleasesComponent } from '../new-releases/new-releases.component';


@Component({
  selector: 'app-spotify-home',
  standalone: true,
  imports: [CommonModule, NavBarComponent, NewReleasesComponent],
  templateUrl: './spotify-home.component.html',
  styleUrl: './spotify-home.component.css'
})

export class SpotifyHomeComponent {
  tracks: Items[] = [];
  private searchInput = new Subject<string>();
  query:string = '';


  constructor(private spotifyAlbumService: SpotifyNewAlbumServiceService, private router: Router) {
    this.searchInput
    .pipe(debounceTime(400)) // wait 400ms after user stops typing
    .subscribe(value => {
      this.query = value;
      this.searchTracks();
    })
  }


  getSearchResult(event: Event){
    const searchVal= (event.target as HTMLInputElement).value;
    this.searchInput.next(searchVal);
  }

  searchTracks(){
 this.spotifyAlbumService.getSearchResults(this.query).subscribe(
      datas => {
        this.tracks = datas.tracks.items;
      }
    );
  }

  getTrackId(trackId: string){
    this.router.navigate(['/spotify/track'], {queryParams: {id: trackId}});
  }

}
