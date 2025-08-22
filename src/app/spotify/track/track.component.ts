import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpotifyNewAlbumServiceService } from '../../services/spotify-new-album-service.service';
import { SpotifyTracksModel } from '../../models/spotify/album-tracks-model.model';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [CommonModule, NavBarComponent, RouterLink],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css',
})

export class TrackComponent implements OnInit {
  albumId: string | null = null;
  trackDetUri =  'https://api.spotify.com/v1/albums/';
  albumDetails: SpotifyTracksModel | undefined;
  previewUrl: string | null = null;
  currentAudio: HTMLAudioElement | null = null;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyNewAlbumServiceService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
     this.route.queryParams.subscribe(params =>{
      this.albumId =params['id'];
      this.trackDetUri = this.trackDetUri + this.albumId;
      this.getTracksInAlbum();
     });
  }

  getTracksInAlbum(){
    this.spotifyService.getTracksInAlbum(this.trackDetUri).subscribe(datas => {
      this.albumDetails = datas; 
    }); 
  }

  ConvertMsToMinute(durationInMs: number){
    let min = Math.floor(durationInMs / 60000);
    let sec = Math.floor((durationInMs % 60000) / 1000);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
