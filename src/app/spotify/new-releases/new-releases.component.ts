import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { Album } from '../../models/spotify/new-album-model.model';
import { SpotifyNewAlbumServiceService } from '../../services/spotify-new-album-service.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-releases',
  standalone: true,
  imports: [CommonModule, NavBarComponent, RouterLink],
  templateUrl: './new-releases.component.html',
  styleUrl: './new-releases.component.css'
})
export class NewReleasesComponent implements OnInit {
  albums: Album[] = [];
  paginatedAlbums: Album[] = [];
  itemsPerRequest = 20;
  currentPage = 1;
  hasMoreItems = false;
  hasPreviousItem = false;

  private newReleaseUri = 'https://api.spotify.com/v1/browse/new-releases?limit=' + this.itemsPerRequest;

  constructor(private spotifyAlbumService: SpotifyNewAlbumServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getNewReleases();
  }

  getNewReleases() {
    this.spotifyAlbumService.getNewSpotifyAlbums(this.newReleaseUri).subscribe(
      datas => {
        this.albums = datas.albums.items;
        this.hasMoreItems = 5 > this.currentPage;
        this.hasPreviousItem = 1 < this.currentPage;
        this.paginatedAlbums = this.albums.slice(0, this.itemsPerRequest);
      }
    );
  }

  loadNext() {
    const offset = this.itemsPerRequest * this.currentPage;
    this.newReleaseUri = 'https://api.spotify.com/v1/browse/new-releases?limit=' + this.itemsPerRequest + '&offset=' + offset;
    this.getNewReleases();
    this.currentPage++;
  }

  loadPrevious(){
    const offset = (this.itemsPerRequest * (this.currentPage - 2));
    this.newReleaseUri = 'https://api.spotify.com/v1/browse/new-releases?limit=' + this.itemsPerRequest + '&offset=' + offset;
    this.getNewReleases();
    this.currentPage--;
  }

  getTrackId(trackId: string){
    this.router.navigate(['/spotify/track'], {queryParams: {id: trackId}});
  }
}
