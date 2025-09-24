"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function LogoutBtn() {
    const t = useTranslations("common")
    const [loading, setLoading] = useState(false);

    const handlelLogOut = async () => {
        try {
            setLoading(true);

            await signOut();
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
            }

            setLoading(false);
        }
    };

    return (
        <Button disabled={loading} className="px-7" onClick={handlelLogOut}>
            {t("Logout")}
        </Button>
    );
}
