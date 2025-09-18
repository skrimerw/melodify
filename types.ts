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

export type TabName = "top" | "artists" | "tracks" | "albums";

export type SearchResult = {
  songs?: SongWithAlbumAndArtist[];
  artists?: Artist[];
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
