'use client'
import React, {useState} from "react";
import Link from "next/link";

export default function BillLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    const [selectedList, setSelectedList] = useState([]);

    return <div className={"w-full h-[100vh]"}>
        <div className={"flex gap-[10px] " +
            "w-[fit-content] py-3 px-5"}>
            <Link href={"/manage/bill/create"} className={"bg-[var(--clr-white)] rounded-[5px] py-2 px-4"}>Create
                Bill</Link>
            <Link href={"/manage/bill/details"} className={"bg-[var(--clr-white)] rounded-[5px] py-2 px-4"}>Bill
                History</Link>
        </div>
        <div className={"w-full h-[90%] overflow-hidden"}>{children}</div>
    </div>
}

