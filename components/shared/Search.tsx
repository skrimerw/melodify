"use client";

import React, { useEffect, useState } from "react";
import FormInput from "./form/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { Api } from "@/lib/api-client";
import PlaylistContext from "./PlaylistContext";
import { SongWithAlbumAndArtist } from "@/types";
import { nanoid } from "nanoid";

export default function Search() {
    const form = useForm({
        defaultValues: {
            search: "",
        },
    });
    const searchVal = form.watch("search");
    const [songs, setSongs] = useState<SongWithAlbumAndArtist[]>([]);
    const [loading, setLoading] = useState(true);

    async function getSongs() {
        try {
            setLoading(true);

            const { data } = await Api.songs.search(searchVal);

            setSongs(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSongs();
    }, [searchVal]);

    return (
        <div>
            <FormProvider {...form}>
                <form>
                    <FormInput
                        name="search"
                        placeholder="What do you want to listen to?"
                    />
                </form>
            </FormProvider>
            <div className="mt-5">
                <PlaylistContext songs={songs} loading={loading} queueId={`search.${nanoid()}`} />
            </div>
        </div>
    );
}
