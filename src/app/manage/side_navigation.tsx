import {useRouter} from "next/router";
import MyButton from "@/components/general/MyButton";
import {Info} from "phosphor-react";
import Link from "next/link";
import React from "react";
import {sideSettingNav} from "@/constraint";

interface SideNavigationProps {
    pathname: string;
}

export default function SideNavigation({pathname}: SideNavigationProps) {

    return <div className={"py-3 ps-3 pe-2 w-full"}>
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
        {sideSettingNav.map((dad, index) =>
            <div key={index} className="">
                <div className={"sub-title text-small font-bold"}>{dad.group}</div>
                <div className={"sub-list flex flex-col mt-2"}>
                    {dad.child.map((item) =>
                        <Link key={index} href={item.path}
                              className={"sub-link-item " + (pathname.includes(item.id) ? "active" : "")}>{item.name}</Link>
                    )}
                </div>
            </div>
        )}
    </div>
}