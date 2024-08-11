import localforage from "localforage";
import {v4 as uuidv4} from 'uuid';

const baseKey = 'ua';

export default {
    async getData(key: string, params?: unknown, cb?: fnType) {
        const data = await localforage.getItem(baseKey, cb);
        // console.log('data:', data);
        // console.log('key:', key);
        // console.log('params:', params);

        if (!data || !data[key]) return;
        return filterData((data[key] as unknown[]), params);
    },
    async setData(key, value, successCallback?: fnType) {
        const res = regx.exec(key);
        if (!res) {
            throw new Error(`key格式错误:${key}`);
        }
        const [_, type, action] = res;
        if (type === 'add') {
            return this.addData(action, value, successCallback);
        }
        if (type === 'edit') {
            return this.editData(action, value, successCallback);
        }
        if (type === 'delete') {
            return this.removeItem(action, value, successCallback);
        }
        throw new Error(`key格式错误:${key}`);
    },
    async addData(key, value, successCallback?: fnType) {
        const data = await localforage.getItem(baseKey) || {};

        if (!data[key]) {
            data[key] = [];
        }
        const item = data[key];
        const uuid = uuidv4();
        value.id = uuid;
        item.push(value);

        return localforage.setItem(baseKey, data, successCallback);
    },
    async editData(key, value, successCallback?: fnType) {
        const data = await localforage.getItem(baseKey) || {};

        if (!data[key]) {
            data[key] = [];
        }
        console.log('data:', data);
        console.log('key:', key);
        console.log('value:', value);

        const item = data[key];
        const obj = item.find(item => item.id === value.id);

        if (!obj) {
            throw new Error(`找不到id为${value.id}的数据`);
        }

        for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                obj[key] = value[key];
            }
        }

        return localforage.setItem(baseKey, data, successCallback);
    },
    async removeItem(key, params, successCallback?: fnType) {
        // console.log('delete');
        // console.log('key:', key);
        // console.log('params:', params);
        const data = await localforage.getItem(baseKey);
        const item = data[key];
        const index = item.findIndex(item => item.id === params.id);
        if (index < 0) {
            throw new Error(`找不到id为${params.id}的数据`);
        }
        data[key] = data[key].filter(item => item.id !== params.id);

        return localforage.setItem(baseKey, data, successCallback);
    },
    clear(successCallback?: fnType) {
        return localforage.clear(successCallback)
    }
};

const filterData = (data: unknown[], params) => {
    if (!params || !Object.keys(params).length) return data;

    return data.filter(item => {
        return Object.keys(params).every(key => {
            return item[key] === params[key];
        });
    })
}

type fnType = (params: unknown) => unknown;

const regx = /^(\w+)\/(\w+)$/;
