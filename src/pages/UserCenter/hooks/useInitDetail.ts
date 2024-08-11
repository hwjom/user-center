import {useEffect} from "react";
import {PAGE_TYPE} from "@/pages/UserCenter/const.ts";

const useInitDetail = ({pageType, form, data}) => {
    // 编辑和查看时，初始化表单数据
    useEffect(() => {
        if (pageType === PAGE_TYPE.EDIT || pageType === PAGE_TYPE.VIEW) {
            form.setFieldsValue(data);
        }
    }, [])

    const isView = pageType === PAGE_TYPE.VIEW;

    return {
        isView
    }
}
export default useInitDetail