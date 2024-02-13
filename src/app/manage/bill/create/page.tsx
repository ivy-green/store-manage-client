'use client'
import React, {useEffect, useState} from "react";
import {productDemo} from "@/constraint";
import {Check, MagnifyingGlass} from "phosphor-react";
import {Input} from "@/components/general/Input";
import MyDropdown from "@/components/general/dropdown/MyDropdown";

const BillCreatePage: React.FC = () => {
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [filteredItems, setFilteredItem] = useState(productDemo);
    const [searchName, setSearchName] = useState("");

    const handleItemClick = (group: string, name: string) => {
        const isChecked = checkedItems.includes(`${group}-${name}`);
        if (isChecked) {
            setCheckedItems(checkedItems.filter(item => item !== `${group}-${name}`));
        } else {
            setCheckedItems([...checkedItems, `${group}-${name}`]);
        }
    };

    const searchByName = (name: string) => {
        setSearchName(name);
        if (name.trim() == "") {
            setFilteredItem(productDemo);
            return;
        }

        let temp = filteredItems.filter(group =>
            group.child.some(product =>
                product.name.toLowerCase().includes(name.toLowerCase())));

        setFilteredItem(temp);
    }

    return (
        <div className={"flex flex-row h-full"}>
            <div className={"flex-1 h-full px-3"}>
                <div className={"flex h-[50px] gap-2 mb-3"}>
                    <div className={"w-[80%]"}>
                        <Input
                            icon={<MagnifyingGlass size={20}/>}
                            value={searchName} onChange={searchByName}/>
                    </div>
                    <div className={"flex-1"}>
                        <MyDropdown width={"w-full"}/>
                    </div>
                </div>
                <div className={" h-[calc(100%_-_60px)] overflow-scroll"}>
                    {filteredItems && filteredItems.map((dad, index) =>
                        <div key={index} className={"flex-1 mt-2"}>
                            <div className={"text-small font-bold capitalize"}>{dad.group}</div>
                            <div className={"grid grid-cols-3 gap-2"}>
                                {dad.child.map((item, index) =>
                                    <div key={index} className={"bill-item relative border-[0.5px] cursor-pointer"}
                                         onClick={() => handleItemClick(dad.group, item.name)}>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id={`${dad.group}-${item.name}`}
                                                onChange={() => {
                                                }} // Disable default checkbox behavior
                                                checked={checkedItems.includes(`${dad.group}-${item.name}`)}
                                                style={{display: 'none'}} // Hide default checkbox
                                            />
                                            <label htmlFor={`${dad.group}-${item.name}`}>{item.name}</label>
                                        </div>
                                        {checkedItems.includes(`${dad.group}-${item.name}`) && (
                                            <Check className={"absolute right-5 top-3 text-success "}
                                                   weight="bold" size={25}/>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={"w-[30vw]"}>
                <h2>Checked Items</h2>
                <ul>
                    {checkedItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BillCreatePage;
