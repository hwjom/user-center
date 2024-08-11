import {useCallback} from "react";
import request from "@/pages/UserCenter/request.ts";
import {PAGE_TYPE} from "@/pages/UserCenter/const.ts";
import {message} from "antd";

const useDetail = ({pageType, setLoading, backHome, data}) => {

    const handleSave = useCallback(async (values) => {
        values.id = data.id;
        try {
            setLoading(true)
            if (pageType === PAGE_TYPE.ADD) {
                await request.addDetail(values);
                message.success('新增成功');
            } else {
                await request.editDetail(values);
                message.success('编辑成功');
            }
            backHome();
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        handleSave,
    }
}
export default useDetail