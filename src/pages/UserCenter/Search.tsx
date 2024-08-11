import React, {useCallback, forwardRef, useImperativeHandle} from "react";
import {Button, Form, Input, Select, Space} from "antd";
import {ROLE_DATA, roleOptions} from "@/pages/UserCenter/const.ts";

const Search: React.FC = forwardRef(({onSearch}, ref) => {
    const [form] = Form.useForm();

    useImperativeHandle(ref, (): FormHandleType => ({
        getFormValues: () => form.getFieldsValue(),
    }), []);

    const handleFinish = useCallback((values) => {
        console.log(values)
        onSearch && onSearch(values);
    }, [])

    return (
        <div>
            <Form layout="inline" form={form} onFinish={handleFinish}>
                <Form.Item name="code" label="用户代码">
                    <Input/>
                </Form.Item>
                <Form.Item name="name" label="用户名称">
                    <Input/>
                </Form.Item>
                <Form.Item name="role" label="角色">
                    <Select style={{
                        minWidth: '100px',
                    }} options={roleOptions}/>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button onClick={() => {
                            form.resetFields()
                        }}>重置</Button>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Space>
                </Form.Item>

            </Form>
        </div>
    )
});
export default React.memo(Search)


export interface FormHandleType {
    getFormValues?: () => unknown;
}