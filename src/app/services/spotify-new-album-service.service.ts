import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { SpotifyAlbumModel } from '../models/spotify/new-album-model.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpotifyTracksModel } from '../models/spotify/album-tracks-model.model';
import { SpotifySearchModel } from '../models/spotify/search-model.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyNewAlbumServiceService {

 private searchBaseUri = `${environment.apiBaseUrl}/spotify/search-track`;
 private newAlbumUri = `${environment.apiBaseUrl}/spotify/new-release`;
  private albumTracksUri = `${environment.apiBaseUrl}/spotify/tracks`;

  constructor(private http: HttpClient) { }

  //Get New Albums
  getNewSpotifyAlbums(uri: string): Observable<SpotifyAlbumModel> {
    return this.http.post<SpotifyAlbumModel>(this.newAlbumUri, {uri});
  }

  /*To Get Album Tracks*/
  getTracksInAlbum(uri: string): Observable<SpotifyTracksModel> {
    return this.http.post<SpotifyTracksModel>(this.albumTracksUri, { uri });
  }

  /*Search Result from Spotify*/
  getSearchResults(searchVal: string): Observable<SpotifySearchModel> {
    return this.http.get<SpotifySearchModel>(this.searchBaseUri, {
      params: { query: searchVal }
    });
  }
}
