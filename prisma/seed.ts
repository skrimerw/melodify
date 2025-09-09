import { songs } from "./constants";
import { prisma } from "./prisma-client";
import bcrypt from "bcrypt";

async function up() {
    await prisma.user.createMany({
        data: [
            {
                username: "user",
                email: "user@test.ru",
                password: bcrypt.hashSync("111111", 10),
            },
        ],
    });

    await prisma.song.createMany({
        data: songs,
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Song" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
}

main();
