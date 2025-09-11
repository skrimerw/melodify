import NextAuth, { DefaultSession, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { prisma } from "./prisma/prisma-client";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcrypt";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            email: string;
            username: string;
            isVerified: boolean;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: number;
        email: string;
        username: string;
        isVerified: boolean;
    }
}

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
    providers: [
        Github /* ({
            profile(profile) {
                return {
                    id: profile.id,
                    username: profile.name || profile.login,
                    email: profile.email || "",
                    image: profile.avatar_url,
                };
            },
        }) */,
        Credentials({
            name: "credentials",
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const { email, password } = credentials;

                const user = await prisma.user.findFirst({
                    where: {
                        email: email as string,
                    },
                });

                if (!user) {
                    throw new Error("Error [LOGIN]");
                }

                if (!bcrypt.compareSync(password as string, user.password)) {
                    throw new Error("Error [LOGIN]");
                }

                return {
                    email: user.email,
                    username: user.username,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (account?.provider === "credentials") {
                    return true;
                }

                if (!user.email) {
                    return false;
                }

                const findUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            {
                                provider: account?.provider,
                                providerId: account?.providerAccountId,
                            },
                            { email: user.email },
                        ],
                    },
                });

                if (findUser) {
                    await prisma.user.update({
                        where: {
                            id: findUser.id,
                        },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId,
                        },
                    });

                    return true;
                }

                await prisma.user.create({
                    data: {
                        email: user.email,
                        username: user.name || "User #" + user.id,
                        provider: account?.provider,
                        providerId: account?.providerAccountId,
                        password: bcrypt.hashSync(String(user.id), 10),
                    },
                });

                return true;
            } catch (e) {
                console.error(e);
                return false;
            }
        },
        async jwt({ token, trigger, session }) {
            let email = token.email;

            if (!email) {
                return token;
            }

            if (trigger === "update") {
                email = session.user.email;
            }

            const user = await prisma.user.findFirst({
                where: {
                    email,
                },
            });

            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.username = user.username;
                token.isVerified = user.isVerified;
            }

            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as never;
                session.user.username = token.username;
                session.user.isVerified = token.isVerified;
            }

            return session;
        },
    },
});
