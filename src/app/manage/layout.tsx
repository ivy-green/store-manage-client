'use client'
import React from 'react';
import store from "@/store/store";
import {Provider} from "react-redux";
import {Toaster} from "react-hot-toast";
import SideNavigation from "@/app/manage/side_navigation";
import {usePathname} from "next/navigation";

export default function ManageLayout({
                                         children,
                                     }: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    return (
        <Provider store={store}>
            <Toaster/>
            <div className={"fixed left-0 w-[14vw] h-full"}>
                <SideNavigation pathname={pathname}/>
            </div>
            <div className={"grid grid-cols-7"}>
                <div></div>
                <div className={"col-span-6"}>{children}</div>
            </div>
        </Provider>
    );
}



