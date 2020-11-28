import Api from '@/services/Api';
export default {
    registerDayOff(credentials) {
        return Api().post('/api/dayOff', credentials);
    },
}