import { describe, expect, test } from "@jest/globals";
import { formatToMinutes, getSongDuration } from "./utils";

describe("getSongDuration function test", () => {
    test("positive test", async () => {
        expect(
            formatToMinutes(await getSongDuration("./public/audio/frayer.mp3"))
        ).toBe("02:56");
    });
});
