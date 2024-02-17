'use client'
import React, {useEffect, useState} from "react";
import {productDemo} from "@/constraint";
import {Check, MagnifyingGlass, Trash} from "phosphor-react";
import {Input} from "@/components/general/Input";
import MyDropdown from "@/components/general/dropdown/MyDropdown";
import {Group, GroupModel} from "@/models/group";
import {DataApi} from "@/models/dataApi";
import {Product, ProductModel} from "@/models/product/product";
import {ProductService} from "@/services/productService";
import {ModelTemplate} from "@/components/template/modelTemplate";

const BillCreatePage: React.FC = () => {
    const apiClient = new DataApi('product');
    const groupApiClient = new DataApi('group');
    const [groupList, setGroupList] = useState([]);
    const productService = new ProductService();
    const product = new ProductModel();
    const [list, setList] = useState([]);

    const [checkedItems, setCheckedItems] = useState<ModelTemplate[]>([]);
    const [filteredItems, setFilteredItem] = useState(productDemo);
    const [searchName, setSearchName] = useState("");

    const getGroupList = () => {
        groupApiClient.getList()
            .then((result) => {
                if (result.status === 200) {
                    setGroupList([]);
                    const getGroupList = result.data.map((item: Group) => new GroupModel(item.id, item.code, item.name, item.created));
                    setGroupList(getGroupList);
                } else {
                    console.log(result.status)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            }).finally(() => {
        });
    }

    const getList = () => {
        apiClient.getList()
            .then((result) => {
                if (result.status === 200) {
                    setList([]);
                    const productList = result.data.map((item: Product) => new ProductModel(
                        item.id, item.code, item.name, item.cost, item.price, item.created, item.group_code));
                    setList(productList);
                } else {
                    console.log(result.status)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
            });
    }

    const handleItemClick = (addedItem: ModelTemplate) => {
        const isChecked = checkedItems.includes(addedItem);
        if (isChecked) {
            setCheckedItems(checkedItems.filter(item => item !== addedItem));
        } else {
            setCheckedItems([...checkedItems, addedItem]);
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

    useEffect(() => {
        getGroupList()
        getList()
    }, []);

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
                    {groupList && groupList.map((dad: GroupModel, index) =>
                        <div key={index} className={"flex-1 mt-2"}>
                            <div className={"text-small font-bold capitalize"}>{dad.name}</div>
                            <div className={"grid grid-cols-3 gap-2"}>
                                {list.filter((item: Product) => item.group_code == dad.code).length > 0 ?
                                    list.filter((item: Product) => item.group_code == dad.code)
                                        .map((item: ProductModel, index) =>
                                            <div key={index}
                                                 className={"bill-item relative border-[0.5px] cursor-pointer"}
                                                 onClick={() => handleItemClick(item)}>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id={`${dad.code}-${item.code}`}
                                                        onChange={() => {
                                                        }} // Disable default checkbox behavior
                                                        checked={checkedItems.includes(item)}
                                                        style={{display: 'none'}} // Hide default checkbox
                                                    />
                                                    <label htmlFor={`${dad.code}-${item.code}`}>{item.name}</label>
                                                </div>
                                                {checkedItems.includes(item) && (
                                                    <Check className={"absolute right-5 top-3 text-success "}
                                                           weight="bold" size={25}/>
                                                )}
                                            </div>
                                        ) :
                                    <div className={"my-3 mx-5"}>
                                        No Items</div>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={"w-[30vw]"}>
                <h2>Checked Items</h2>
                <div className={""}>
                    {checkedItems.map((item: ModelTemplate, index) => (
                        <div key={index}
                             className={"py-4 px-3 rounded-[5px] w-[95%] " +
                                 "border-[0.5px] bg-amber-300 text-default " +
                                 "flex cursor-pointer"}>
                            <div
                                className={"me-4 px-1 overflow-hidden w-0 hover:w-fit " +
                                    "transition duration-200 flex items-center rounded-sm " +
                                    "bg-white text-default-"}>
                                <Trash
                                    className={""}
                                    size={16}/>
                            </div>
                            <div>{(item as ProductModel).name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BillCreatePage;
