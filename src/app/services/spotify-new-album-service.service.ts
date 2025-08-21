import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { SpotifyAlbumModel } from '../models/spotify/new-album-model.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyNewAlbumServiceService {

  constructor(private http: HttpClient) { }

  //Get New Albums
  getNewSpotifyAlbums(uri: string): Observable<SpotifyAlbumModel>{
    return this.generateAccessToken().pipe(
      switchMap(tokenGenerated => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${tokenGenerated}`
        });
        return this.http.get<SpotifyAlbumModel>(uri, { headers });
      })
    );
  }

   /*To Get Spotify Access Token*/
  private clientId: string = 'fdea4f6fedfb4448a50d86fae5cf1c1b';
  private clientSecret: string = '4fdc634d09894a86ac8ffa9670316557';
  private tokenUrl = 'https://accounts.spotify.com/api/token';

  generateAccessToken():Observable<string>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: this.clientId,
      client_secret: this.clientSecret
    });
    return this.http.post<{access_token: string}>(this.tokenUrl, body.toString(),{headers}).pipe(map(res => res.access_token));
  }
}
