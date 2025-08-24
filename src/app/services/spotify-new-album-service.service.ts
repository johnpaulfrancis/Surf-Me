import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { SpotifyAlbumModel } from '../models/spotify/new-album-model.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpotifyTracksModel } from '../models/spotify/album-tracks-model.model';
import { SpotifySearchModel } from '../models/spotify/search-model.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyNewAlbumServiceService {

  private searchBaseUri = 'https://api.spotify.com/v1/search';

  constructor(private http: HttpClient) { }

  //Get New Albums
  getNewSpotifyAlbums(uri: string): Observable<SpotifyAlbumModel> {
    return this.generateAccessToken().pipe(
      switchMap(tokenGenerated => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${tokenGenerated}`
        });
        return this.http.get<SpotifyAlbumModel>(uri, { headers });
      })
    );
  }

  /*To Get Album Tracks*/
  getTracksInAlbum(albumTrackUrl: string): Observable<SpotifyTracksModel> {
    return this.generateAccessToken().pipe(
      switchMap(tokenGenerated => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${tokenGenerated}`
        });
        return this.http.get<SpotifyTracksModel>(albumTrackUrl, { headers });
      })
    );
  }

  /*Search Result from Spotify*/
  getSearchResults(searchVal: string): Observable<SpotifySearchModel>{
    return this.generateAccessToken().pipe(
      switchMap(tokenGenerated => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${tokenGenerated}`
        });
        return this.http.get<SpotifySearchModel>(this.searchBaseUri, {
          headers,
          params:{q: searchVal, limit: 20, type: 'track', offset: 0}
        });
      })
    )
  }


  /*To Get Spotify Access Token*/
  private clientId: string = 'fdea4f6fedfb4448a50d86fae5cf1c1b';
  private clientSecret: string = '4fdc634d09894a86ac8ffa9670316557';
  private tokenUrl = 'https://accounts.spotify.com/api/token';

  generateAccessToken(): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: this.clientId,
      client_secret: this.clientSecret
    });
    return this.http.post<{ access_token: string }>(this.tokenUrl, body.toString(), { headers }).pipe(map(res => res.access_token));
  }
}
