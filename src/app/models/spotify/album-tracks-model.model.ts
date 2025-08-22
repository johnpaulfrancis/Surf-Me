export class AlbumTracksModel {
}

export interface SpotifyTracksModel{
    album_type: string;
    total_tracks: number;
    href: string;
    id: string;
    images: Image[];
    name: string;
    tracks: Tracks;
    popularity: number;
    release_date: string;
}

export interface Image{
    height: number;
    url: string;
    width:number;
}

export interface Tracks{
    total: number;
    href:string;
    items: TrackItems[];
}

export interface TrackItems{
    disc_number: number;
    duration_ms: number;
    href: string;
    id: string;
    name: string;
    track_number: number;
    preview_url: string;
    external_urls: ExternalUrls;
}

export interface ExternalUrls{
    spotify: string;
}
