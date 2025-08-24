import { Album, ExternalUrls } from "./new-album-model.model";

export class SearchModel {
}

export interface SpotifySearchModel{
    tracks: Tracks;
}

export interface Tracks{
    href: string;
    limit: number;
    offset:number;
    total: number;
    items: Items[];
}

export interface Items{
    album: Album;
    disc_number:number;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrls;
    is_playable:boolean;
    name: string;
    popularity:number;
    track_number: number;
    type: string;
}

