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
import React from "react";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <StoreProvider userId={session?.user.id}>
            <main className="main-layout h-screen p-3 overflow-y-hidden">
                <Sidebar className="w-[300px] overflow-hidden">
                    <Navigation />
                    <Library
                        className="overflow-auto"
                        isLogged={!!session?.user}
                    />
                </Sidebar>
                <section className="relative z-0 h-full rounded-lg overflow-hidden bg-card">
                    <BoxWrapper
                        id="scroll-container"
                        className="flex flex-col main-container relative h-full z-10 overflow-auto bg-transparent p-0"
                    >
                        <Header />
                        <div className="absolute -z-1 bg-gradient-to-b from-[var(--average-background-color)]/30 to-card h-1/3 top-0 left-0 right-0"></div>
                        <div className="px-6 py-4 min-h-full h-fit">
                            {children}
                        </div>
                    </BoxWrapper>
                </section>
                <AudioPlayer className="col-span-2 h-[94px]" />
            </main>
        </StoreProvider>
    );
}
