export default {
    getData(key?: string): any {
        const res = localStorage.getItem(basePath);
        if (!res) {
            return null;
        }
        const obj = JSON.parse(res);
        if (!key) {
            return obj;
        }

        return obj[key];
    },
    setData(key: string, value: any) {
        let res: any = localStorage.getItem(basePath);
        if (!res) {
            res = {};
        }
        res;
    },
};

const basePath = "ua";

const parseKey = (key: string): string[] => {
    return key.split("\\");
};
