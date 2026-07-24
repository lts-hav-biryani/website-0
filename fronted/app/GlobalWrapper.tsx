"use client";
import { GlobalContext } from "./context/GlobalContext";
export const GlobalProviderWrapper = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <GlobalContext>
        {children}
    </GlobalContext>
};