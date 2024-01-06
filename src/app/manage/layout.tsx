'use client'
import React from 'react';
import store from "@/store/store";
import {Provider} from "react-redux";

export default function ManageLayout({
                                         children,
                                     }: {
    children: React.ReactNode
}) {
    return (
        <Provider store={store}>
            <div className={"grid grid-cols-7"}>
                <div className={"side-nav"}>navigation</div>
                <div className={"col-span-6"}>{children}</div>
            </div>
        </Provider>
    );
}

