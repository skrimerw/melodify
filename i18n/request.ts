import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const locales = ["en", "ru"];

export default getRequestConfig(async () => {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get("lang")?.value || "en";

    const locale = locales.includes(cookieLocale) ? cookieLocale : "en";

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default,
    };
});
