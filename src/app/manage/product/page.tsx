'use client'
import React, {useEffect, useState} from 'react';
import MyTableTemplate from "@/components/template/MyTableTemplate";
import {DataApiClient} from "@/models/DataApiClient"

const ProductPage: React.FC = () => {
    const apiClient = new DataApiClient('product');
    const [list, setList] = useState([]);

    const getList = () => {
        apiClient.getList()
            .then((createdData) => {
                console.log('Resource created:', createdData);
                if (createdData.status === 200) {
                    setList(createdData.data);
                } else {
                    console.log(createdData.status)
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
