import { Prisma } from "@prisma/client";

export type SongWithAlbumAndArtist = Prisma.SongGetPayload<{
    include: {
        album: true;
        artist: true;
    };
}>;
