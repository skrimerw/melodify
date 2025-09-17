import { Prisma } from "@prisma/client";

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
