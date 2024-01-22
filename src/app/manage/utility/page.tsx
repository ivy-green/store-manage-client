'use client'
import React, {useEffect, useState} from 'react';
import MyTableTemplate from "@/components/template/MyTableTemplate";
import {DataApi} from "@/models/dataApi"
import toast from "react-hot-toast";
import {ModelTemplate} from "@/components/template/modelTemplate";
import {useDispatch, useSelector} from "react-redux";
import {tableSelector} from "@/selectors/consumerSelector";
import {UtilityService} from "@/services/utilityService";
import {Utility, UtilityModel} from "@/models/utility/utility";


const UtilityPage: React.FC = () => {
    const apiClient = new DataApi('utility');
    const tableData = useSelector(tableSelector);
    const utilityService = new UtilityService();
    const utility = new UtilityModel();
    const [list, setList] = useState([]);

    const getList = () => {
        apiClient.getList()
            .then((result) => {
                if (result.status === 200) {
                    setList([]);
                    console.log(result.data)
                    const utilityList = result.data.map((item: Utility) => new UtilityModel(
                        item.id, item.code, item.name, item.cost, item.unit, item.oldNum, item.newNum, item.created));
                    setList(utilityList);
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
                headerTitle={"Utility List"}
                service={utilityService}
                getList={getList}
                model={utility}
                list={list}
            />
        </>
    );
}

export default UtilityPage;
