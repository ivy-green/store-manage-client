import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

// interface MyObject {
//     code: number;
//     name: string;
//     [key: string]: any; // Allow additional properties with any value
// }

interface MyDropdownProps {
    width?: string;
    height?: string;
    list: any[];
    getVal: (val: string) => void;
}

export default function MyDropdown({
                                       list = [],
                                       width = "w-[10vw]",
                                       height = "h-full",
                                       getVal
                                   }: MyDropdownProps) {
    const [selectedKeys, setSelectedKeys] = React.useState("");

    const selectedValue = React.useMemo(
        () => {
            return Array.from(selectedKeys).join(", ").replaceAll("_", " ")
        },
        [selectedKeys]
    );

    const childClass = "py-1.5 px-5 mb-2 rounded-[5px]";

    return (
        <div className={width + " " + height}>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        className="capitalize
                    bg-btn-default text-white rounded-[10px] px-4 py-2 h-full w-full font-bold
                    flex justify-around items-center"
                    >
                        {selectedValue == "" ? `Choose option` : selectedValue}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={(val) => {
                        setSelectedKeys(val as string);
                        const valueArray = Array.from((val as Set<String>).values());
                        console.log(valueArray[0])
                        getVal(valueArray[0] as string)
                    }}
                    className={"w-[150%] left-[-20px] bg-white border-2 p-1 rounded-[10px]"}
                >
                    {
                        list ? list.map((item: any, index) => <DropdownItem key={item.name} className={childClass}>
                                {item.name}
                            </DropdownItem>) :
                            <>
                                <DropdownItem key="name a-z" className={childClass}>Name A-Z</DropdownItem>
                                <DropdownItem key="name z-a" className={childClass}>Name Z-A</DropdownItem>
                            </>
                    }
                </DropdownMenu>
            </Dropdown>

        </div>


    );
}
