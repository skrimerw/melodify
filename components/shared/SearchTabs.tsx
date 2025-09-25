"use client";

import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { SearchResult, TabName } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import TracksTab from "./TracksTab";
import AlbumsTab from "./AlbumsTab";
import ArtistsTab from "./ArtistsTab";
import AllTab from "./AllTab";
import { useDebouncedCallback } from "use-debounce";
import qs from "qs";
import { Api } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Props {
  searchVal: string;
  className?: string;
}

type Tab = {
  label: string;
  name: TabName;
};

const tabs: Tab[] = [
  { label: "all", name: "all" },
  { label: "artist", name: "artists" },
  { label: "track", name: "tracks" },
  { label: "album", name: "albums" },
];

export default function SearchTabs({ searchVal, className }: Props) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") as TabName;
  const [activeTab, setActiveTab] = useState<TabName>(tab);
  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState<SearchResult>({});
  const router = useRouter();
  const hasInitiallyFetched = useRef(false);
  const t = useTranslations("common.names");

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

      const { data } = await Api.song.search(searchVal.trim(), activeTab);

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

    const timeout = setTimeout(() => {
      hasInitiallyFetched.current = true;
    }, 700);

    return () => {
      clearTimeout(timeout);
    };
  }, [activeTab]);

  return (
    <Tabs
      className={cn("h-full", className)}
      defaultValue={tab || "all"}
      onValueChange={(value) => setActiveTab(value as TabName)}
    >
      <TabsList className="bg-transparent gap-2.5">
        {tabs.map(({ label, name }, i) => {
          return (
            <TabsTrigger key={i} value={name} disabled={loading}>
              {t(label, {count: 10})}
            </TabsTrigger>
          );
        })}
      </TabsList>
      <div className="mt-5 h-full">
        <TabsContent value="all" asChild>
          <AllTab searchResult={searchResult} loading={loading} />
        </TabsContent>
        <TabsContent value="artists" asChild>
          <ArtistsTab artists={searchResult.artists} loading={loading} />
        </TabsContent>
        <TabsContent value="tracks" asChild>
          <TracksTab songs={searchResult.songs} loading={loading} />
        </TabsContent>
        <TabsContent value="albums" asChild>
          <AlbumsTab albums={searchResult.albums} loading={loading} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
