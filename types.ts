import { Artist, Prisma } from "@prisma/client";

export type SongWithAlbumAndArtist = Prisma.SongGetPayload<{
    include: {
        album: true;
        artist: true;
    };
}>;

export type AlbumWithSongs = Prisma.AlbumGetPayload<{
    include: {
        songs: true;
    };
}>;

export type ArtistWithSongs = Prisma.ArtistGetPayload<{
    include: {
        songs: true;
    };
}>;

export type TabName = "all" | "artists" | "tracks" | "albums";

export type SearchResult = {
    songs?: SongWithAlbumAndArtist[];
    artists?: Prisma.ArtistGetPayload<{
        include: {
            songs: {
                include: {
                    album: true;
                    artist: true;
                };
            };
        };
    }>[];
    albums?: Prisma.AlbumGetPayload<{
        include: {
            artist: true;
            songs: {
                include: {
                    album: true;
                    artist: true;
                };
            };
        };
    }>[];
};

export type LibraryResult = {
    pinnedAlbums?: Prisma.AlbumGetPayload<{
        include: {
            artist: true;
            songs: true;
        };
    }>[];
    pinnedArtists?: Prisma.ArtistGetPayload<{
        include: {
            songs: {
                include: {
                    album: true;
                };
            };
        };
    }>[];
};
