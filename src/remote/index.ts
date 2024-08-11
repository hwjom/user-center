import storage from "@/storage";

interface Request {
    get: (url: string, params: unknown) => Promise<unknown>;
    post: (url: string, data: unknown) => Promise<unknown>;
}

const request: Request = {
    get: (url: string, params) => {
        params = JSON.parse(JSON.stringify(params))
        filterData(params);
        return storage.getData(url, params);
    },
    post: (url: string, data: unknown) => {
        data = JSON.parse(JSON.stringify(data))
        filterData(data);
        return storage.setData(url, data)
    },
};

export default request;

// 过滤空值（空数组、空字符串、空对象）
const filterData = (data) => {
    for (const key in data) {
        if (!data[key] || Array.isArray(data[key]) && data[key].length === 0 || typeof data[key] === 'object' && Object.keys(data[key]).length === 0) {
            delete data[key];
        } else if (typeof data[key] === 'object') {
            filterData(data[key]);
        }
    }
}