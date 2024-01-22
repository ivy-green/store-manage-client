'use client'
import React from 'react';
import store from "@/store/store";
import {Provider} from "react-redux";
import {Toast} from "reactstrap";
import {Toaster} from "react-hot-toast";

export default function ManageLayout({
                                         children,
                                     }: {
    children: React.ReactNode
}) {
    return (
        <Provider store={store}>
            <Toaster/>
            <div className={"grid grid-cols-7"}>
                <div className={"side-nav"}>navigation</div>
                <div className={"col-span-6"}>{children}</div>
            </div>
        </Provider>
    );
}

