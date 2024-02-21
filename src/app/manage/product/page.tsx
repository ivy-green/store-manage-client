'use client'
import React, {useEffect, useState} from 'react';
import MyTableTemplate from "@/components/template/MyTableTemplate";
import {DataApi} from "@/models/dataApi"
import {Product, ProductModel} from "@/models/product/product";
import {ProductService} from "@/services/productService";
import {useSelector} from "react-redux";
import {tableSelector} from "@/selectors/consumerSelector";
import {Group, GroupModel} from "@/models/group";
import GroupPage from "@/app/manage/product/group_page";


const ProductPage: React.FC = () => {
    const apiClient = new DataApi('product');
    const groupApiClient = new DataApi('group');
    const tableData = useSelector(tableSelector);
    const productService = new ProductService();
    const product = new ProductModel();
    const [list, setList] = useState([]);
    const [displayList, setDisplayList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [option, setOption] = useState("");

    const getList = () => {
        setIsLoading(true)
        apiClient.getList()
            .then((result) => {
                if (result.status === 200) {
                    setList([]);
                    const productList = result.data.map((item: Product) => new ProductModel(
                        item.id, item.code, item.name, item.cost, item.price, item.created, item.group_code));
                    setList(productList);
                    setDisplayList(productList)
                } else {
                    console.log(result.status)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            }).finally(() => setIsLoading(false))
    }

    const getGroupList = () => {
        setIsLoading(true)
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
            }).finally(() => setIsLoading(false))
    }


    const getListByOption = () => {
        setIsLoading(true)
        if (option != "") {
            let filteredList = list.filter((item: ProductModel) => item.group_code == option)
            setDisplayList(filteredList)
        } else {
            setDisplayList(list)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getList();
        getGroupList();
    }, [])

    useEffect(() => {
        getListByOption()
    }, [option]);

    return (
        <div className={"flex"}>
            <GroupPage
                list={groupList}
                groupChosen={option}
                setGroupChosen={(value) => setOption(value)}/>
            <div className={" w-[75%]"}>
                {!isLoading && <MyTableTemplate
                    headerTitle={"Product List"}
                    service={productService}
                    getList={getListByOption}
                    model={product}
                    list={displayList}
                />}
            </div>
        </div>
    );
}

export default ProductPage;
