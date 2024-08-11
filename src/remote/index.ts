import storage from "@/storage";

interface Request {
    get: (url: string, params: unknown) => Promise<unknown>;
    post: (url: string, data: unknown) => Promise<unknown>;
}

const request: Request = {
    get: (url: string, params) => storage.getData(url, JSON.parse(JSON.stringify(params))),
    post: (url: string, data: unknown) => storage.setData(url, JSON.parse(JSON.stringify(data))),
};

export default request;
