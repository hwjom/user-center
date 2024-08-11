import {useCallback, useEffect, useRef, useState} from "react";
import {FormHandleType} from "@/pages/UserCenter/Search.tsx";
import {PAGE_TYPE} from "@/pages/UserCenter/const.ts";
import request from "@/pages/UserCenter/request.ts";

const useInitData = () => {
    const [pageType, setPageType] = useState(PAGE_TYPE.LIST);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // 获取列表数据
    const fetchData = useCallback(async (params = formRef.current.getFormValues?.()) => {
        try {
            setLoading(true);
            //   TODO: fetch data
            params = JSON.parse(JSON.stringify(params));
            const data = await request.getListData(params);
            // console.log(data);
            setData((data as any[]));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [])

    const formRef = useRef<FormHandleType>({});


    return {
        formRef,
        fetchData,
        pageType,
        setPageType,
        data,
        loading,
        setLoading,
    }
}
export default useInitData