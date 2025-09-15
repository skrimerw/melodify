import { Search } from "@/components/shared";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Search - Melodify",
};

export default function SearchPage() {
    return (
        <div>
            <h1 className="text-3xl font-semibold mb-5">Search</h1>
            <Search />
        </div>
    );
}
