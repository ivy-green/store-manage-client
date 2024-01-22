import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import MyButton from "@/components/general/MyButton";

export default function MyDropdown() {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["name a-z"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    const childClass = "py-1.5 px-5 mb-2 rounded-[10px]";

    return (
        <div className={"w-[10vw]"}>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        className="capitalize
                    bg-btn-default text-white rounded-[10px] px-4 py-2 h-full w-full font-bold
                    flex justify-around items-center"
                    >
                        {selectedValue}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={(val) => {
                        setSelectedKeys((val as Set<string>))
                    }}
                    className={"w-[150%] left-[-20px] bg-white border-2 p-1 rounded-[10px]"}
                >
                    <DropdownItem key="name a-z" className={childClass}>Name A-Z</DropdownItem>
                    <DropdownItem key="name z-a" className={childClass}>Name Z-A</DropdownItem>
                </DropdownMenu>
            </Dropdown>

        </div>


    );
}
