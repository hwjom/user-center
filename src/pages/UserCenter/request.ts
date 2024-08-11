import request from '@/remote'

const {post, get} = request;

export default {
    getListData: (params) => get('ua', params),
    getDetail: (id) => get('ua', id),
    addDetail: (data) => post('add/ua', data),
    editDetail: (data) => post('edit/ua', data),
    deleteDetail: (id) => post('delete/ua', id),
}