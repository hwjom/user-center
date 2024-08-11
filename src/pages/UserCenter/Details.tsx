import React, {useEffect, useState} from "react";
import {Button, Form, Input, Select, Space, Spin} from "antd";
import useDetail from "@/pages/UserCenter/hooks/useDetail.ts";
import {PAGE_TYPE, roleOptions} from "@/pages/UserCenter/const.ts";
import useInitDetail from "@/pages/UserCenter/hooks/useInitDetail.ts";

const Details: React.FC<DetailsProps> = (props) => {
    const {data, pageType, backHome} = props;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const {isView} = useInitDetail({pageType, form, data});

    const {handleSave} = useDetail({setLoading, pageType, backHome, data})


    return (
        <Spin spinning={loading}>
            <Form form={form} onFinish={handleSave} disabled={isView}>
                <Form.Item<FieldType> name="code" label="用户代码" rules={[
                    {
                        required: true,
                        message: '请输入用户代码'
                    }
                ]}>
                    <Input/>
                </Form.Item>
                <Form.Item<FieldType> name="name" label="用户名称" rules={[
                    {
                        required: true,
                        message: '请输入用户名称'
                    }
                ]}>
                    <Input/>
                </Form.Item>
                <Form.Item<FieldType> name="role" label="角色" rules={[
                    {
                        required: true,
                        message: '请选择角色'
                    }
                ]}>
                    <Select options={roleOptions}/>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button disabled={false} onClick={() => {
                            backHome();
                        }}>取消</Button>
                        <Button htmlType="submit" type="primary">保存</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Spin>
    )
}

export default React.memo(Details)

type FieldType = {
    code?: string;
    username?: string;
    role?: string;
};


interface DetailsProps {
    data: FieldType | undefined;
    pageType: typeof PAGE_TYPE[keyof typeof PAGE_TYPE];
    backHome: () => void;
}