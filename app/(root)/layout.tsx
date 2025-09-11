import { auth } from "@/auth";
import {
    BoxWrapper,
    Header,
    Library,
    Navigation,
    Sidebar,
    StoreProvider,
} from "@/components/shared";
import { AudioPlayer } from "@/components/shared/AudioPlayer";
import { AudioPlayerProvider } from "@/context/useAudioPlayer";
import React from "react";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <AudioPlayerProvider>
            <StoreProvider userId={session?.user.id}>
                <main className="main-layout h-screen p-3 overflow-y-hidden">
                    <Sidebar className="w-[300px] overflow-hidden">
                        <Navigation />
                        <Library className="overflow-auto" />
                    </Sidebar>
                    <section className="relative z-0 h-full rounded-lg overflow-hidden bg-card">
                        <div className="absolute bg-gradient-to-b from-emerald-900 to-card h-1/3 top-0 left-0 right-0"></div>
                        <BoxWrapper className="main-container relative h-full z-10 overflow-auto bg-transparent p-0">
                            <Header />
                            <div className="px-6 py-4">{children}</div>
                        </BoxWrapper>
                    </section>
                    <AudioPlayer className="col-span-2 h-[94px]" />
                </main>
            </StoreProvider>
        </AudioPlayerProvider>
    );
}
