import {useCallback, useState} from "react";
import request from "@/pages/UserCenter/request.ts";
import {message} from "antd";
import {PAGE_TYPE} from "@/pages/UserCenter/const.ts";

const useOperator = ({fetchData, setLoading, setPageType}) => {
    const handleSearch = useCallback((values) => {
        console.log(values)
        fetchData(values);
    }, [fetchData]);
    // 刷新
    const backHome = useCallback(() => {
        fetchData();
        setPageType(PAGE_TYPE.LIST);
    }, []);

    const [detail, setDetail] = useState({});

    // 获取明细数据
    const fetchDetail = useCallback(async (id) => {
        setLoading(true);
        try {
            const data = await request.getDetail({id});
            const obj = data[0];
            setDetail(obj);
            // console.log('detail:', data)
        } catch (e) {
            message.error('获取数据失败');
        } finally {
            setLoading(false);
        }
    }, []);

    // 删除
    const handleDelete = useCallback(async (id) => {
        setLoading(true);
        try {
            await request.deleteDetail({id});
            message.success('删除成功');
            fetchData();
        } catch (e) {
            message.error('删除失败');
        } finally {
            setLoading(false);
        }
    }, [fetchData]);

    return {
        handleSearch,
        fetchDetail,
        detail,
        handleDelete,
        backHome
    }
}

export default useOperator