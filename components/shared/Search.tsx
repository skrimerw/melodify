"use client";

import React, { useEffect, useRef, useState } from "react";
import FormInput from "./form/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { Api } from "@/lib/api-client";
import { SearchResult, TabName } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { useDebouncedCallback } from "use-debounce";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ArtistsTab from "./ArtistsTab";
import TracksTab from "./TracksTab";
import AlbumsTab from "./AlbumsTab";

type Tab = {
    label: string;
    name: TabName;
};

const tabs: Tab[] = [
    { label: "Top", name: "top" },
    { label: "Artists", name: "artists" },
    { label: "Tracks", name: "tracks" },
    { label: "Albums", name: "albums" },
];

export default function Search() {
    const searchParams = useSearchParams();
    const text = searchParams.get("text");
    const tab = (searchParams.get("tab") as TabName) || "top";
    const form = useForm({
        defaultValues: {
            text: text || "",
        },
    });
    const searchVal = form.watch("text");
    const [searchResult, setSearchResult] = useState<SearchResult>({});
    const [activeTab, setActiveTab] = useState<TabName>(tab);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const hasInitiallyFetched = useRef(false);

    const debounced = useDebouncedCallback(() => {
        getSongs();

        if (hasInitiallyFetched.current) {
            const queryParams = qs.stringify(
                {
                    text: searchVal === "" ? null : searchVal,
                },
                {
                    addQueryPrefix: true,
                    skipNulls: true,
                }
            );

            router.push(queryParams, {
                scroll: false,
            });
        }
    }, 700);

    async function getSongs() {
        try {
            setLoading(true);

            const { data } = await Api.songs.search(
                searchVal.trim(),
                activeTab
            );

            setSearchResult(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (hasInitiallyFetched.current) {
            debounced();
        }
    }, [searchVal]);

    useEffect(() => {
        getSongs();

        if (hasInitiallyFetched.current) {
            const sp = qs.stringify(
                {
                    text: searchVal === "" ? null : searchVal,
                    tab: activeTab,
                },
                {
                    addQueryPrefix: true,
                    skipNulls: true,
                }
            );

            router.push(sp, {
                scroll: false,
            });
        }

        hasInitiallyFetched.current = true;
    }, [activeTab]);

    return (
        <div>
            <FormProvider {...form}>
                <form>
                    <FormInput
                        name="text"
                        placeholder="What do you want to listen to?"
                    />
                </form>
            </FormProvider>
            <div className="mt-5">
                <Tabs
                    defaultValue={tab}
                    onValueChange={(value) => setActiveTab(value as TabName)}
                >
                    <TabsList className="bg-transparent gap-2.5">
                        {tabs.map(({ label, name }, i) => {
                            return (
                                <TabsTrigger
                                    key={i}
                                    value={name}
                                    disabled={loading}
                                >
                                    {label}
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>
                    <div className="mt-5">
                        <TabsContent value="top">
                            Make changes to your account here.
                        </TabsContent>
                        <TabsContent value="artists" asChild>
                            <ArtistsTab
                                artists={searchResult.artists}
                                loading={loading}
                            />
                        </TabsContent>
                        <TabsContent value="tracks" asChild>
                            <TracksTab
                                songs={searchResult.songs}
                                loading={loading}
                            />
                        </TabsContent>
                        <TabsContent value="albums" asChild>
                            <AlbumsTab
                                albums={searchResult.albums}
                                loading={loading}
                            />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
