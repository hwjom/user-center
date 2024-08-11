import React, {useMemo} from "react";
import {Button, Space, Table, Tag} from "antd";
import './inex.less';
import {columns, PAGE_TYPE,  tagColorMap} from "./const";
import Search from "@/pages/UserCenter/Search.tsx";
import Detail from "@/pages/UserCenter/Details.tsx";
import useInitData from "@/pages/UserCenter/hooks/useInitData.tsx";
import useOperator from "@/pages/UserCenter/hooks/useOperator.ts";

const Index = () => {

    // 初始化数据
    const {
        formRef,
        fetchData,
        loading,
        setLoading,
        data,
        pageType,
        setPageType,
    } = useInitData()

    // 操作
    const {handleSearch, fetchDetail, detail, handleDelete, backHome} = useOperator({
        fetchData,
        setLoading,
        setPageType
    });

    // 渲染表格列
    const renderColumns = useMemo(() => (columns || []).map(item => {
        item = {...item};
        if (item.dataIndex === 'role') {
            item.render = (text) => {
                return <Tag color={tagColorMap[text]}>{text}</Tag>
            }
        }
        if (item.dataIndex === 'action') {
            item.render = (text, record) => (
                <Space>
                    <Button
                        type="link"
                        onClick={async () => {
                            await fetchDetail(record.id);
                            setPageType(PAGE_TYPE.EDIT);
                        }}>
                        编辑
                    </Button>
                    <Button
                        type="link"
                        onClick={async () => {
                            await fetchDetail(record.id);
                            setPageType(PAGE_TYPE.VIEW);
                        }}>
                        查看
                    </Button>
                    <Button
                        type="link"
                        onClick={() => {
                            handleDelete(record.id);
                        }}>
                        删除
                    </Button>
                </Space>
            )
        }

        return item;
    }), [handleDelete, fetchDetail])

    return (
        <div className="ua-container">
            <div className={`ua-container-list ${pageType !== PAGE_TYPE.LIST ? 'hidden' : ''}`}>
                <Search onSearch={handleSearch} ref={formRef}/>
                <div className="ua-container-operator">
                    <Button
                        type="primary"
                        onClick={() => {
                            setPageType(PAGE_TYPE.ADD);
                        }}>
                        新增
                    </Button>
                </div>
                <Table
                    rowKey='id'
                    pagination={false}
                    loading={loading}
                    dataSource={data}
                    columns={renderColumns}
                />
            </div>
            {pageType !== PAGE_TYPE.LIST && (
                <Detail
                    data={detail}
                    pageType={pageType}
                    backHome={backHome}
                />
            )}
        </div>
    );
};
export default React.memo(Index);
