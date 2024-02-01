'use client'
import React from 'react';
import store from "@/store/store";
import {Provider} from "react-redux";
import {Toaster} from "react-hot-toast";
import Link from 'next/link';
import MyButton from "@/components/general/MyButton";
import {Info} from "phosphor-react";

export default function ManageLayout({
                                         children,
                                     }: {
    children: React.ReactNode
}) {
    return (
        <Provider store={store}>
            <Toaster/>
            <div className={"grid grid-cols-7"}>
                <SideNavigation/>
                <div className={"col-span-6"}>{children}</div>
            </div>
        </Provider>
    );
}

function SideNavigation() {
    return <div className={"py-3 ps-3 pe-2"}>
        <div className={"flex items-center mb-5"}>
            <div className={"bg-grey w-[40px] h-[40px] overflow-hidden rounded-[100%]"}></div>
            <div className={"flex-1 ms-3 text-normal font-bold text-default"}>User 1</div>
            <div className={""}>
                <MyButton label={""} onTap={() => {
                }} surfix={<Info weight="fill" size={16}/>}
                          bgColor={"transparent"}
                          fontColorHover={"text-[var(--clr-primary)]"}
                          fontColor={"text-default"}
                />
            </div>
        </div>
        <div className="">
            <div className={"sub-title text-small font-bold"}>Settings</div>
            <div className={"sub-list flex flex-col mt-2"}>
                <Link href={"/manage/product"} className={"sub-link-item"}>Product</Link>
                <Link href={"/manage/utility"} className={"sub-link-item"}>Utility</Link>
            </div>
        </div>
    </div>
}

