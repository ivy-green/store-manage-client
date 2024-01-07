'use client'
import React, {useEffect, useState} from 'react';
import MyTableTemplate from "@/components/template/MyTableTemplate";
import {DataApi} from "@/models/dataApi"
import {Product, ProductModel} from "@/models/product/product";


const ProductPage: React.FC = () => {
    const apiClient = new DataApi('product');
    const [list, setList] = useState([]);

    const getList = () => {
        apiClient.getList()
            .then((result) => {
                if (result.status === 200) {
                    console.log('Resource created:', result.data);
                    const productList = result.data.map((item: Product) => new ProductModel(item.id, item.code, item.name, item.cost, item.price, item.created).getAllField());
                    console.log(productList)
                    setList(productList);
                } else {
                    console.log(result.status)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const insertHandle = () => {
        console.log("insert click")
    }

    const detailsHandle = (data: Object, type: string) => {
        console.log("details click")
    }

    const temp = [
        {
            id: "1",
            name: "name 1",
            age: 23,
            address: "23 Modress Feet Ward"
        },
        {
            id: "2",
            name: "name 2",
            age: 23,
            address: "23 Modress Feet Ward"
        },
        {
            id: "3",
            name: "name 3",
            age: 44124,
            address: "2532 Modress Feet Ward"
        }
    ]

    useEffect(() => {
        getList();
    }, [])

    return (
        <>
            <MyTableTemplate
                insertHandle={insertHandle}
                detailsHandle={detailsHandle}
                headerTitle={"Product List"}
                list={list}
            />
        </>
    );
}

export default ProductPage;
