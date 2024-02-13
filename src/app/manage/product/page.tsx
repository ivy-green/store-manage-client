'use client'
import React, {useEffect, useState} from 'react';
import MyTableTemplate from "@/components/template/MyTableTemplate";
import {DataApi} from "@/models/dataApi"
import {Product, ProductModel} from "@/models/product/product";
import {ProductService} from "@/services/productService";
import {useSelector} from "react-redux";
import {tableSelector} from "@/selectors/consumerSelector";
import {Group, GroupModel} from "@/models/group";
import MyButton from "@/components/general/MyButton";
import {Plus} from "phosphor-react";
import {ModelTemplate} from "@/components/template/modelTemplate";
import GroupPage from "@/app/manage/product/group_page";


const ProductPage: React.FC = () => {
    const apiClient = new DataApi('product');
    const groupApiClient = new DataApi('group');
    const tableData = useSelector(tableSelector);
    const productService = new ProductService();
    const product = new ProductModel();
    const [list, setList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [option, setOption] = useState("");

    const getList = () => {
        setIsLoading(true)
        apiClient.getList()
            .then((result) => {
                if (result.status === 200) {
                    setList([]);
                    const productList = result.data.map((item: Product) => new ProductModel(item.id, item.code, item.name, item.cost, item.price, item.created));
                    setList(productList);
                } else {
                    console.log(result.status)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const getListByGroup = () => {
        setIsLoading(true)
        apiClient.getListByGroup(option)
            .then((result) => {
                if (result.status === 200) {
                    setList([]);
                    const productList = result.data.map((item: Product) => new ProductModel(item.id, item.code, item.name, item.cost, item.price, item.created));
                    setList(productList);
                } else {
                    console.log(result.status)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
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
            }).finally(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        getList();
        getGroupList();
    }, [])

    const getListByOption = () => {
        if (option != "") {
            getListByGroup()
        } else {
            getList()
        }
    }

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
                <MyTableTemplate
                    headerTitle={"Product List"}
                    service={productService}
                    getList={getList}
                    model={product}
                    list={list}
                />
            </div>
        </div>
    );
}

export default ProductPage;
