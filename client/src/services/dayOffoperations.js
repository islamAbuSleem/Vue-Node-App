import Api from '@/services/Api';
export default {
    registerDayOff(credentials) {
        return Api().post('/api/dayOff', credentials);
    },
    updateDayOffCount(id,count) {
        console.log(id,count)
        return Api().put(`/api/user/userId/${id}`, count);
    },
}