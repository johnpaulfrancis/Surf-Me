import { TestBed } from '@angular/core/testing';

import { SpotifyNewAlbumServiceService } from './spotify-new-album-service.service';

describe('SpotifyNewAlbumServiceService', () => {
  let service: SpotifyNewAlbumServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyNewAlbumServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
