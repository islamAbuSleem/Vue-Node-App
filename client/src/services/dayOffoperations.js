import Api from '@/services/Api';
export default {
    registerDayOff(credentials) {
        return Api().post('/api/dayOff', credentials);
    },
    updateDayoffCount(credentials) {
        return Api().put(`/api/user/userId/${credentials.userId}`, credentials);
    },
}