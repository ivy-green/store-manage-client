'use client'
import React, {useEffect, useState} from 'react';
import MyTableTemplate from "@/components/template/MyTableTemplate";
import {DataApi} from "@/models/dataApi"
import {Product, ProductModel} from "@/models/product/product";
import {ProductService} from "@/services/productService";
import toast from "react-hot-toast";
import {ModelTemplate} from "@/components/template/modelTemplate";
import {useDispatch, useSelector} from "react-redux";
import {tableSelector} from "@/selectors/consumerSelector";


const ProductPage: React.FC = () => {
    const apiClient = new DataApi('product');
    const tableData = useSelector(tableSelector);
    const productService = new ProductService();
    const product = new ProductModel();
    const [list, setList] = useState([]);

    const getList = () => {
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
            });
    }

    useEffect(() => {
        getList();
    }, [])

    return (
        <>
            <MyTableTemplate
                headerTitle={"Product List"}
                service={productService}
                getList={getList}
                model={product}
                list={list}
            />
        </>
    );
}

export default ProductPage;
