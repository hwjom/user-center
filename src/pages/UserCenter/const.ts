import type {TableProps} from 'antd';

interface DataType {
    id: string;
    code: string
    name: string;
    roles: string[];
}

// 表格列配置
export const columns: TableProps<DataType>['columns'] = [
    {
        key: 'code',
        title: '用户代码',
        dataIndex: 'code',
    }, {
        key: 'name',
        title: '用户名称',
        dataIndex: 'name',
    }, {
        key: 'role',
        title: '角色',
        dataIndex: 'role',
    }, {
        key: 'action',
        title: '操作',
        dataIndex: 'action',
    }
]
// 角色数据
export const ROLE_DATA = {
    ADMIN: {
        value: 'Admin',
        label: '管理员',
    }, USER: {
        value: 'user',
        label: '普通用户',
    }, VISITOR: {
        value: 'vistor',
        label: '访客',
    },
}
export const roleOptions = Object.values(ROLE_DATA);

// 页面类型
export enum PAGE_TYPE {
    ADD = 1,
    EDIT,
    VIEW,
    LIST,
}

// 标签颜色映射
export const tagColorMap = {
    [ROLE_DATA.ADMIN.value]: 'red',
    [ROLE_DATA.USER.value]: 'blue',
    [ROLE_DATA.VISITOR.value]: 'green',
}